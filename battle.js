/* =====================================================================
   BATTLE: Revenge mode (báo thù câu sai cũ) + Boss fight (mini mock test)
   Nạp sau fun.js. Dùng chung: $, $$, esc, plain, unv, nrm, TOK, toks, parseTok, chipsOf, nounCheck,
   lessonsOf, storeKey, lsGet/lsSet, ME_KEY, avHtml, AVATARS, confetti, sfx, soundOn, shuffle, today, post…
   ===================================================================== */
const BAT_KEY = 'b2-battle';
const batState = () => Object.assign({ stars: 0, days: {}, beaten: {}, fights: 0, wins: 0, flawless: 0, boss: {} }, lsGet(BAT_KEY) || {});
const batSave = s => lsSet(BAT_KEY, s);
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Âm thanh trận đấu (WebAudio, không cần file) ---------- */
let NOISE = null;
function actx(){
  if (!soundOn()) return null;
  try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; } catch (e) { return null; }
}
function noiseBuf(a){
  if (NOISE) return NOISE;
  NOISE = a.createBuffer(1, a.sampleRate, a.sampleRate);
  const d = NOISE.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return NOISE;
}
function tone(a, { type = 'sine', f0, f1, t0 = 0, dur, vol = .2 }){
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
  o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + .05);
}
function noise(a, { t0 = 0, dur, vol = .3, freq = 1200, q = .7 }){
  const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime + t0;
  s.buffer = noiseBuf(a); f.type = 'lowpass'; f.frequency.setValueAtTime(freq, t); f.frequency.exponentialRampToValueAtTime(80, t + dur); f.Q.value = q;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  s.connect(f).connect(g).connect(a.destination); s.start(t); s.stop(t + dur + .05);
}
function bsfx(kind){
  const a = actx(); if (!a) return;
  if (kind === 'zap'){ tone(a, { type: 'square', f0: 1400, f1: 220, dur: .22, vol: .08 }); }
  else if (kind === 'hit'){ noise(a, { dur: .25, vol: .45, freq: 2500 }); tone(a, { f0: 160, f1: 50, dur: .25, vol: .35 }); }
  else if (kind === 'crit'){ noise(a, { dur: .35, vol: .5, freq: 4000 }); tone(a, { type: 'square', f0: 900, f1: 1800, dur: .12, vol: .07 }); tone(a, { f0: 120, f1: 40, dur: .35, vol: .4 }); }
  else if (kind === 'hurt'){ tone(a, { type: 'sawtooth', f0: 420, f1: 90, dur: .35, vol: .12 }); noise(a, { dur: .3, vol: .35, freq: 900 }); }
  else if (kind === 'charge'){ tone(a, { f0: 180, f1: 1400, dur: .85, vol: .14 }); tone(a, { type: 'triangle', f0: 90, f1: 700, dur: .85, vol: .1 }); }
  else if (kind === 'laser'){ tone(a, { type: 'sawtooth', f0: 2200, f1: 300, dur: .5, vol: .09 }); noise(a, { dur: .5, vol: .25, freq: 6000 }); }
  else if (kind === 'slash'){ noise(a, { dur: .12, vol: .4, freq: 7000, q: 2 }); }
  else if (kind === 'boom'){ noise(a, { dur: 1.1, vol: .7, freq: 1800 }); tone(a, { f0: 90, f1: 28, dur: 1, vol: .5 }); }
  else if (kind === 'win'){ [523, 659, 784, 1047, 1319].forEach((f, i) => tone(a, { type: 'triangle', f0: f, t0: i * .11, dur: .35, vol: .16 })); }
  else if (kind === 'lose'){ [392, 330, 262, 196].forEach((f, i) => tone(a, { type: 'sawtooth', f0: f, t0: i * .18, dur: .3, vol: .07 })); }
  else if (kind === 'start'){ [262, 392, 523].forEach((f, i) => tone(a, { type: 'square', f0: f, t0: i * .09, dur: .14, vol: .06 })); }
}

/* ---------- Câu hỏi: lấy từ bài học (Revenge) hoặc từ BOSSES ---------- */
function questionsOf(L){
  const out = [];
  L.ex.forEach(e => { let c = 0; itemsOfEx(e).forEach(it => {
    const ts = toks(it.t);
    ts.forEach((tok, ti) => {
      const label = e.type === 'text' ? String(++c) : it.n + (ts.length > 1 ? 'abcdefgh'[ti] : '');
      out.push({ k: e.id + '-' + label, e, it, ti, tok, label, h: Array.isArray(it.h) ? it.h[ti] : it.h, L });
    });
  }); });
  return out;
}
// Câu sai lần 1 của các bài đã xong, chưa bị "hạ gục". ULTIMATE = vẫn sai ở lần 2.
function revengePool(){
  const st = batState(), pool = [];
  Object.keys(LESSONS).map(Number).filter(w => w <= OPEN_WEEK).forEach(w => lessonsOf(w).forEach((L, i) => {
    const s = lsGet(storeKey(w, i + 1)) || {};
    if (s.phase !== 'done' || !s.r1) return;
    questionsOf(L).forEach(q => {
      const r1 = s.r1.items[q.k]; if (!r1 || r1.ok) return;
      const id = `w${w}-${i + 1}:${q.k}`; if (st.beaten[id]) return;
      if (q.e.type === 'speak') return;
      pool.push(Object.assign(q, { id, w, ult: !!(s.r2 && s.r2.items[q.k] && !s.r2.items[q.k].ok) }));
    });
  }));
  return pool;
}
const PART_HOW = {
  1: 'Use of English Part 1 · Choose the word that best fits the gap.',
  2: 'Use of English Part 2 · Write ONE word in the gap.',
  3: 'Use of English Part 3 · Use the word in CAPITALS to form a word that fits the gap.',
  4: 'Use of English Part 4 · Complete the second sentence so it means the same as the first. Use the word given (2–5 words).',
};
function bossQuestions(B){
  return B.qs.map((x, i) => ({ k: B.id + '-' + (i + 1), id: B.id + '-' + (i + 1), label: String(i + 1), ti: 0, tok: toks(x.t)[0], h: x.h, ult: !!x.ult,
    part: x.p, base: x.base, first: x.first, key: x.key, it: { t: x.t }, e: { type: 'list', how: PART_HOW[x.p], trans: x.p === 4 } }));
}
const bossOpen = B => OPEN_WEEK >= B.after || (PREVIEW && QP.get('boss') === B.id);

/* ---------- Hiển thị 1 câu trong trận ---------- */
function battleSentence(q){
  if (q.it.vi) return `<div class="tvi">${esc(q.it.vi)}</div>${q.it.ph ? `<div class="tph">💬 ${q.it.ph}</div>` : ''}<span class="bblank">_______</span>`;
  let i = -1;
  let s = String(q.it.t).replace(TOK, m0 => {
    i++; const tk = parseTok([...m0.matchAll(TOK)][0]);
    if (i === q.ti) return '\u0001';
    return tk.kind === 'ch' ? unv(tk.opts[tk.correct[0]]) : tk.kind === 'gap' ? tk.alts[0] : tk.sg;
  });
  s = plain(s);
  if (q.e.type === 'text'){
    const ss = s.split(/(?<=[.!?:’])\s+/), j = ss.findIndex(x => x.includes('\u0001'));
    if (j >= 0) s = (j > 0 && ss[j].trim().startsWith('\u0001') ? ss[j - 1] + ' ' : '') + ss[j];
  }
  const only = s.replace('\u0001', '').trim() === '';
  let html = only ? '' : esc(s).replace('\u0001', '<span class="bblank">_______</span>');
  if (q.it.v) html += ` <em class="bv">(${esc(plain(q.it.v))})</em>`;
  if (q.base) html += ` <b class="bbase">${esc(q.base)}</b>`;
  if (q.first) html = `<div class="bfirst">${esc(q.first)}</div><div class="bkey">${esc(q.key)}</div>` + html;
  return html;
}
function battleAnswers(q){
  const t = q.tok, e = q.e;
  if (t.kind === 'ch') return { type: 'opt', opts: shuffle(t.opts.map((o, i) => ({ label: plain(unv(o)), ok: t.correct.includes(i) }))) };
  if (e.drag && e.box || e.sents){
    const chips = chipsOf(e), right = t.alts[0];
    const pick = shuffle(chips.filter(c => c.w === right).concat(shuffle(chips.filter(c => c.w !== right)).slice(0, 3)));
    return { type: 'opt', opts: pick.map(c => ({ label: e.sents ? c.w + '. ' + plain(c.s) : c.w, ok: c.w === right })) };
  }
  const f = e.trans ? nrmT : nrm;
  return { type: 'type', check: v => t.kind === 'noun' ? nounCheck(v, t.sg, t.pl).ok : t.alts.some(a => f(a) === f(v)),
    answer: t.kind === 'noun' ? tokText(t) : t.alts[0] };
}
const correctOf = q => q.tok.kind === 'ch' ? q.tok.correct.map(i => plain(unv(q.tok.opts[i]))).join(' + ') : q.tok.kind === 'noun' ? tokText(q.tok) : q.tok.alts[0];

/* ---------- Hiệu ứng ---------- */
const center = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
function fxEl(cls, css, parent){ const d = document.createElement('div'); d.className = cls; Object.assign(d.style, css || {}); (parent || $('#bt')).appendChild(d); return d; }
function shake(el, px = 10, ms = 380){ el.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${-px}px,${px / 2}px)` }, { transform: `translate(${px}px,${-px / 2}px)` }, { transform: `translate(${-px / 2}px,${-px / 3}px)` }, { transform: 'translate(0,0)' }], { duration: ms }); }
function flash(color, ms = 260, op = .55){ const f = fxEl('bt-flash', { background: color }); f.animate([{ opacity: op }, { opacity: 0 }], { duration: ms, easing: 'ease-out' }).onfinish = () => f.remove(); }
function dmgNum(el, text, cls){
  const c = center(el), d = fxEl('bt-dmg ' + (cls || ''), { left: c.x + 'px', top: (c.y - (cls === 'me' ? 50 : 0)) + 'px' }); d.textContent = text;
  d.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: 'translate(-50%,-120%) scale(1.25)', opacity: 1, offset: .25 }, { transform: 'translate(-50%,-230%) scale(1)', opacity: 0 }], { duration: 1100, easing: 'ease-out' }).onfinish = () => d.remove();
}
function burst(p, color, n = 18, spread = 120){
  for (let i = 0; i < n; i++){
    const a = Math.random() * Math.PI * 2, r = spread * (.4 + Math.random() * .8), s = 4 + Math.random() * 7;
    const d = fxEl('bt-spark', { left: p.x + 'px', top: p.y + 'px', width: s + 'px', height: s + 'px', background: color, boxShadow: `0 0 10px ${color}` });
    d.animate([{ transform: 'translate(-50%,-50%)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px)) scale(.2)`, opacity: 0 }], { duration: 500 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => d.remove();
  }
}
async function projectile(from, to, color){
  const a = center(from), b = center(to);
  const o = fxEl('bt-orb', { left: a.x + 'px', top: a.y + 'px', background: `radial-gradient(circle, #fff 0 20%, ${color} 45%, transparent 70%)` });
  bsfx('zap');
  await o.animate([{ transform: 'translate(-50%,-50%) scale(.6)' }, { transform: `translate(calc(-50% + ${b.x - a.x}px), calc(-50% + ${b.y - a.y}px)) scale(1.3)` }], { duration: 330, easing: 'cubic-bezier(.5,0,.9,.6)' }).finished;
  o.remove(); burst(b, color);
}
function hitEnemy(big){
  const en = $('#btEnemy');
  en.animate([{ transform: 'translate(0,0)', filter: 'brightness(1)' }, { transform: `translate(${big ? 26 : 14}px,-6px) rotate(${big ? 6 : 3}deg)`, filter: 'brightness(2.4) saturate(0)' }, { transform: 'translate(0,0)', filter: 'brightness(1)' }], { duration: big ? 520 : 360, easing: 'ease-out' });
}
async function ultimate(){
  const bt = $('#bt'), en = $('#btEnemy'), pl = $('#btPlayer');
  bt.classList.add('ult'); bsfx('charge');
  const word = fxEl('bt-ultword'); word.innerHTML = '⚡ ULTIMATE ⚡';
  word.animate([{ transform: 'translate(-50%,-50%) scale(3)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: .35 }, { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1, offset: .8 }, { transform: 'translate(-50%,-50%) scale(1.4)', opacity: 0 }], { duration: 1000 }).onfinish = () => word.remove();
  pl.animate([{ filter: 'drop-shadow(0 0 0 #ffc83d)' }, { filter: 'drop-shadow(0 0 28px #ffc83d)' }], { duration: 800, fill: 'forwards' });
  await sleep(850);
  const a = center(pl), b = center(en), len = Math.hypot(b.x - a.x, b.y - a.y), ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
  const beam = fxEl('bt-beam', { left: a.x + 'px', top: a.y + 'px', width: len + 'px', transform: `rotate(${ang}deg) scaleX(0)` });
  bsfx('laser');
  await beam.animate([{ transform: `rotate(${ang}deg) scaleX(0)` }, { transform: `rotate(${ang}deg) scaleX(1)` }], { duration: 180, fill: 'forwards' }).finished;
  for (let i = 0; i < 3; i++){
    const sl = fxEl('bt-slash', { left: b.x + 'px', top: b.y + 'px', transform: `translate(-50%,-50%) rotate(${[-35, 35, 90][i]}deg) scaleX(0)` });
    bsfx('slash'); hitEnemy(true); shake(bt, 14, 260); burst(b, ['#ffc83d', '#ff2e88', '#22e3ff'][i], 14, 150);
    sl.animate([{ transform: `translate(-50%,-50%) rotate(${[-35, 35, 90][i]}deg) scaleX(0)`, opacity: 1 }, { transform: `translate(-50%,-50%) rotate(${[-35, 35, 90][i]}deg) scaleX(1)`, opacity: 1, offset: .4 }, { transform: `translate(-50%,-50%) rotate(${[-35, 35, 90][i]}deg) scaleX(1.1)`, opacity: 0 }], { duration: 380 }).onfinish = () => sl.remove();
    await sleep(170);
  }
  beam.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250 }).onfinish = () => beam.remove();
  bsfx('boom'); flash('#fff', 420, .85); shake(bt, 22, 600); burst(b, '#fff', 40, 260);
  pl.animate([{ filter: 'drop-shadow(0 0 28px #ffc83d)' }, { filter: 'none' }], { duration: 400, fill: 'forwards' });
  bt.classList.remove('ult');
}
async function enemyStrike(big){
  const bt = $('#bt'), en = $('#btEnemy'), pl = $('#btPlayer');
  await en.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: 'translate(-30px,40px) scale(1.18)' }, { transform: 'translate(0,0) scale(1)' }], { duration: 380, easing: 'cubic-bezier(.3,1.6,.6,1)' }).finished;
  bsfx('hurt');
  const c = center(pl);
  for (let i = 0; i < 3; i++){
    const cl = fxEl('bt-claw', { left: (c.x - 34 + i * 26) + 'px', top: (c.y - 70) + 'px' });
    cl.animate([{ clipPath: 'inset(0 0 100% 0)', opacity: 1 }, { clipPath: 'inset(0 0 0 0)', opacity: 1, offset: .35 }, { clipPath: 'inset(0 0 0 0)', opacity: 0 }], { duration: 650, delay: i * 50 }).onfinish = () => cl.remove();
  }
  shake(bt, big ? 20 : 12, big ? 600 : 400); flash('#ff1744', big ? 420 : 300, big ? .55 : .4);
  pl.animate([{ filter: 'none' }, { filter: 'brightness(.6) sepia(1) hue-rotate(-50deg) saturate(5)' }, { filter: 'none' }], { duration: 450 });
  bt.classList.add('hurt'); setTimeout(() => bt.classList.remove('hurt'), 700);
  if (big){ const cr = fxEl('bt-crack'); cr.animate([{ opacity: .9 }, { opacity: 0 }], { duration: 1200, easing: 'ease-in' }).onfinish = () => cr.remove(); }
}

/* ---------- Trận đấu ---------- */
// cfg: { mode, title, enemy: {name, img}, qs, ko: % máu địch còn lại tối đa để thắng, canKO (em có thể bị hạ gục) }
function startBattle(cfg){
  const me = lsGet(ME_KEY) || {}, qs = cfg.qs;
  const totalW = qs.reduce((s, q) => s + (q.ult ? 2 : 1), 0);
  const B = { i: 0, ehp: 100, php: 100, combo: 0, maxCombo: 0, res: [], lost: 0, startedAt: new Date().toISOString(), over: false };
  window.__BT = B; // để kiểm thử tự động
  const ov = document.createElement('div'); ov.className = 'bt'; ov.id = 'bt';
  ov.innerHTML = `
    <div class="bt-bg"></div><div class="bt-vig"></div>
    <div class="bt-hud">
      <div class="bt-ebar"><div class="bt-en"><b>${esc(cfg.enemy.name)}</b><small>${esc(cfg.title)}</small></div>
        <div class="hp big"><i class="trail" id="eTrail"></i><i class="fill" id="eFill"></i><span class="ko" style="left:${cfg.ko}%" title="KO line"></span></div>
        <div class="bt-hint">Đẩy máu xuống dưới vạch <b>KO</b> để thắng!</div></div>
      <button class="bt-x" type="button" aria-label="Thoát">✕</button>
    </div>
    <div class="bt-stage">
      <div class="bt-enemy" id="btEnemy"><img src="img/ui/${cfg.enemy.img}.webp" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'bt-eemo',textContent:'${cfg.enemy.emo || '👾'}'}))"></div>
      <div class="bt-player" id="btPlayer">${avHtml(me.av || AVATARS[0], 'av')}<div class="bt-pinfo"><b>${esc((String(me.name || 'You').trim().split(/\s+/).pop()))}</b>${typeof activeTitle === 'function' && activeTitle() ? `<small>${esc(activeTitle().n)}</small>` : ''}<div class="hp"><i class="trail" id="pTrail"></i><i class="fill p" id="pFill"></i></div></div></div>
      <div class="bt-combo" id="btCombo"></div>
      <div class="bt-count" id="btCount"></div>
    </div>
    <div class="bt-q" id="btQ"></div>`;
  document.body.appendChild(ov); document.body.classList.add('noscroll');
  const setHP = () => {
    $('#eFill').style.width = B.ehp + '%'; setTimeout(() => { const t = $('#eTrail'); if (t) t.style.width = B.ehp + '%'; }, 450);
    $('#pFill').style.width = B.php + '%'; setTimeout(() => { const t = $('#pTrail'); if (t) t.style.width = B.php + '%'; }, 450);
    $('#eFill').classList.toggle('low', B.ehp <= cfg.ko);
    $('#pFill').classList.toggle('low', B.php <= 30);
  };
  const close = () => { B.over = true; ov.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', onKey); if (!LESSON) renderHome(); };
  const onKey = ev => { if (ev.key === 'Escape' && B.done) close(); };
  document.addEventListener('keydown', onKey);
  ov.querySelector('.bt-x').onclick = () => { if (B.done || confirmQuit()) close(); };
  function confirmQuit(){ return window.confirm('Thoát trận? Kết quả trận này sẽ không được tính.'); }

  function show(){
    const q = qs[B.i], A = battleAnswers(q); B.cur = { q, A, lock: false };
    $('#btCount').textContent = `${B.i + 1} / ${qs.length}`;
    $('#btQ').innerHTML = `
      ${q.ult ? '<div class="bt-ulttag">⚡ ULTIMATE QUESTION · ×2 damage</div>' : ''}
      <div class="bt-how">${esc(plain(q.e.how || ''))}${q.L ? ` <span class="bt-src">· ${esc(q.L.kind)} ${esc(q.L.code)}</span>` : ''}</div>
      ${q.e.box && !q.e.drag ? `<div class="bt-box">${q.e.box.map(w => w.startsWith('~') ? '' : `<span>${esc(plain(unv(w)))}</span>`).join('')}</div>` : ''}
      <div class="bt-sent">${battleSentence(q)}</div>
      ${A.type === 'opt'
        ? `<div class="bt-opts${A.opts.some(o => o.label.length > 40) ? ' long' : ''}">${A.opts.map((o, i) => `<button class="bt-opt" type="button" data-i="${i}">${esc(o.label)}</button>`).join('')}</div>`
        : `<form class="bt-type" autocomplete="off"><input class="bt-in" type="text" autocapitalize="off" spellcheck="false" placeholder="Type your answer…"><button class="btn orange" type="submit">ATTACK ⚔️</button></form>`}
      <div class="bt-fb" id="btFb"></div>`;
    $('#btQ').classList.toggle('ultq', !!q.ult);
    const inp = $('#btQ .bt-in'); if (inp) setTimeout(() => inp.focus(), 50);
  }
  ov.addEventListener('click', ev => { const b = ev.target.closest('.bt-opt'); if (b && B.cur && !B.cur.lock) answer(B.cur.A.opts[+b.dataset.i].ok, b.textContent, b); });
  ov.addEventListener('submit', ev => { ev.preventDefault(); const inp = $('#btQ .bt-in'); if (!B.cur || B.cur.lock || !inp.value.trim()) return; answer(B.cur.A.check(inp.value), inp.value.trim(), inp); });

  async function answer(ok, ans, el){
    const { q, A } = B.cur; B.cur.lock = true;
    $$('#btQ .bt-opt, #btQ .bt-in, #btQ button').forEach(x => x.disabled = true);
    const w = q.ult ? 2 : 1;
    B.res.push({ q, ans, ok });
    if (ok){
      el.classList.add('ok'); B.combo++; B.maxCombo = Math.max(B.maxCombo, B.combo);
      const dmg = Math.round(w / totalW * 100 * (B.combo >= 3 ? 1 : 1));
      if (q.ult) await ultimate();
      else { await projectile($('#btPlayer'), $('#btEnemy'), B.combo >= 3 ? '#ffc83d' : '#22e3ff'); bsfx(B.combo >= 3 ? 'crit' : 'hit'); hitEnemy(false); shake($('#btEnemy'), 6, 250); }
      B.ehp = Math.max(0, B.ehp - w / totalW * 100); setHP();
      dmgNum($('#btEnemy'), (B.combo >= 3 ? 'CRIT ' : '') + '-' + dmg, q.ult ? 'ult' : B.combo >= 3 ? 'crit' : '');
      if (B.combo >= 2){ const c = $('#btCombo'); c.textContent = `COMBO ×${B.combo}`; c.animate([{ transform: 'scale(1.8)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 300 }); }
      $('#btFb').innerHTML = `<span class="good">${q.ult ? '💥 ULTIMATE HIT!' : ['✔ Nice hit!', '✔ Boom!', '✔ Clean shot!', '✔ Direct hit!'][B.i % 4]}</span>`;
      await sleep(q.ult ? 700 : 650); next();
    } else {
      if (el) el.classList.add('bad');
      if (A.type === 'opt') $$('#btQ .bt-opt').forEach((b, i) => { if (A.opts[i].ok) b.classList.add('ok'); });
      B.combo = 0; $('#btCombo').textContent = '';
      await enemyStrike(q.ult);
      const hurt = (q.ult ? 28 : 16) * (cfg.canKO ? 1 : .8);
      B.php = cfg.canKO ? Math.max(0, B.php - hurt) : Math.max(8, B.php - hurt); B.lost += hurt; setHP();
      dmgNum($('#btPlayer'), '-' + Math.round(hurt), 'me');
      $('#btFb').innerHTML = `<div class="bad">✖ Ouch! Answer: <b>${esc(correctOf(q))}</b></div>${q.h ? `<div class="bt-tip">💡 ${esc(plain(q.h))}</div>` : ''}<button class="btn" type="button" id="btNext">${B.php <= 0 ? 'Continue' : 'Next ▶'}</button>`;
      $('#btNext').onclick = next; $('#btNext').focus();
    }
  }
  function next(){
    if (B.over) return;
    if (cfg.canKO && B.php <= 0) return end(false, true);
    B.i++; if (B.i < qs.length) show(); else end(B.ehp <= cfg.ko + .01, false);
  }
  async function end(win, ko){
    B.done = true; B.over = false;
    const right = B.res.filter(r => r.ok).length, total = qs.length;
    const en = $('#btEnemy');
    if (win){
      bsfx('boom'); flash('#fff', 600, .9); burst(center(en), '#ffc83d', 60, 320); burst(center(en), '#ff2e88', 40, 260);
      await en.animate([{ transform: 'scale(1)', filter: 'brightness(1)', opacity: 1 }, { transform: 'scale(1.3) rotate(-8deg)', filter: 'brightness(3)', opacity: .8, offset: .4 }, { transform: 'scale(.2) rotate(25deg)', filter: 'brightness(5)', opacity: 0 }], { duration: 900, fill: 'forwards' }).finished;
      bsfx('win'); confetti(160);
    } else { bsfx('lose'); $('#btPlayer').animate([{ filter: 'none' }, { filter: 'grayscale(1) brightness(.5)' }], { duration: 600, fill: 'forwards' }); }
    const r = cfg.onEnd ? cfg.onEnd({ win, ko, right, total, res: B.res, flawless: B.lost === 0, startedAt: B.startedAt, maxCombo: B.maxCombo }) : {};
    $('#btQ').classList.remove('ultq');
    $('#btQ').innerHTML = `<div class="bt-end ${win ? 'win' : 'lose'}">
      <img class="bt-endmas" src="img/ui/mascot-${win ? 2 : 3}.webp" alt="">
      <div class="bt-endt">${win ? 'VICTORY!' : ko ? 'K.O.' : 'DEFEATED'}</div>
      <div class="bt-ends">${right}/${total} correct · best combo ×${B.maxCombo}${B.lost === 0 && win ? ' · <b>FLAWLESS</b>' : ''}</div>
      ${r.msg ? `<div class="bt-endm">${r.msg}</div>` : ''}
      <div class="gbtns">${r.again ? '<button class="btn orange" type="button" id="btAgain">Fight again 🔁</button>' : ''}<button class="btn lite" type="button" id="btClose">Close</button></div></div>`;
    $('#btClose').onclick = close;
    const ag = $('#btAgain'); if (ag) ag.onclick = () => { ov.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', onKey); r.again(); };
  }
  setHP(); bsfx('start'); show();
  const en = $('#btEnemy'); en.animate([{ transform: 'translateY(-60px) scale(.6)', opacity: 0 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], { duration: 600, easing: 'cubic-bezier(.3,1.5,.6,1)' });
}

/* ---------- Gửi kết quả cho cô (mail + XP) ---------- */
function sendBattle(title, unit, out){
  const me = lsGet(ME_KEY) || {};
  const items = out.res.map((r, i) => ({ sec: '1', n: String(i + 1), q: plain(battleSentence(r.q).replace(/<span class="bblank">_______<\/span>/, '___')) + (r.q.ult ? ' ⚡' : ''), ans: r.ans, correct: correctOf(r.q), ok: r.ok }));
  const now = new Date().toISOString();
  const p = { app: 'btvn', unit, title, name: me.name || 'Unknown', cls: me.cls || '', sid: 'bt' + Date.now().toString(36), redo: 0,
    attempt: 1, canRetry: false, startedAt: out.startedAt, submittedAt: now, timeTakenSec: Math.round((Date.parse(now) - Date.parse(out.startedAt)) / 1000), leaves: 0,
    score: out.right, total: out.total, sections: [{ id: '1', title: `${title} · ${out.win ? 'VICTORY' : 'DEFEATED'}`, score: out.right, total: out.total }],
    items, extras: [], audios: [], wantsAudio: false, audio: null };
  post(p).catch(() => {});
}

/* ---------- Revenge mode ---------- */
function startRevenge(){
  const pool = revengePool(); if (!pool.length) return;
  const qs = shuffle(pool.filter(q => q.ult)).concat(shuffle(pool.filter(q => !q.ult))).slice(0, 10);
  startBattle({ mode: 'revenge', title: 'REVENGE MODE', enemy: { name: 'Mistake Phantom', img: 'enemy-' + (1 + Math.floor(Math.random() * 3)), emo: '👻' },
    qs: shuffle(qs), ko: 35, canKO: true,
    onEnd: out => {
      const st = batState(); st.fights++;
      out.res.forEach(r => { if (r.ok) st.beaten[r.q.id] = Date.now(); });
      let gain = 0;
      if (out.win){ st.wins++; if (out.flawless) st.flawless++; const t = today(), n = st.days[t] || 0; if (n < 3){ gain = 1; st.stars += 1; } st.days = { [t]: n + 1 }; }
      batSave(st);
      sendBattle(`B2 First Revenge – ${today()}`, 'B2 Revenge', out);
      const left = revengePool().length;
      return { msg: `${out.res.filter(r => r.ok).length} mistakes defeated${gain ? ' · +1 ⭐' : ''}. ${left ? `Còn <b>${left}</b> câu sai đang chờ em báo thù.` : 'Không còn câu sai nào. Đỉnh! 🏆'}`, again: left ? startRevenge : null };
    } });
}
function revengeCard(){
  const n = revengePool().length, st = batState();
  return `<section class="card rvg${n ? '' : ' off'}"><img class="rvgi" src="img/ui/enemy-1.webp" alt="👻" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'rvge',textContent:'👻'}))">
    <div class="qrt"><b>Revenge mode</b><span>${n ? `<b>${n}</b> old mistake${n > 1 ? 's' : ''} waiting for revenge ⚔️` : 'Không có câu sai nào để báo thù. Làm bài xong sẽ mở!'}</span>
    ${st.fights ? `<small>Defeated ${Object.keys(st.beaten).length} mistakes · ${st.wins} wins</small>` : ''}</div>
    <button class="btn orange" id="rvgBtn" type="button"${n ? '' : ' disabled'}>Fight ⚔️</button></section>`;
}

/* ---------- Boss fight ---------- */
function startBoss(B){
  startBattle({ mode: 'boss', title: `BOSS FIGHT · ${B.units}`, enemy: { name: B.name, img: B.img, emo: '🐉' }, qs: bossQuestions(B), ko: 40, canKO: false,
    onEnd: out => {
      const st = batState(), rec = st.boss[B.id] || {};
      const first = !rec.done;
      rec.done = true; rec.best = Math.max(rec.best || 0, out.right); rec.win = rec.win || out.win; rec.at = rec.at || new Date().toISOString();
      if (out.win && !rec.starred){ rec.starred = true; st.stars += 3; }
      st.boss[B.id] = rec; batSave(st);
      if (first && !PREVIEW) sendBattle(`B2 First Boss – ${B.name}`, 'B2 Boss', out);
      return { msg: `${PREVIEW ? '👀 Xem trước – không gửi cô. ' : first ? '📩 Cô đã nhận kết quả trận đầu tiên của em. ' : 'Trận luyện tập (không gửi cô). '}${out.win && rec.starred ? '+3 ⭐ · ' : ''}Best: ${rec.best}/${out.total}`, again: () => startBoss(B) };
    } });
}
// ô Boss trên bản đồ: trả về các hàng cần chèn sau tuần B.after
function bossRows(){ return BOSSES.map(B => ({ boss: B, open: bossOpen(B), rec: (batState().boss || {})[B.id] || null })); }

/* ---------- Gắn vào trang chủ ---------- */
function afterHomeBattle(){
  const b = $('#rvgBtn'); if (b) b.onclick = () => startRevenge();
  $$('[data-boss]').forEach(x => x.onclick = ev => { ev.preventDefault(); const B = BOSSES.find(y => y.id === x.dataset.boss); if (B && bossOpen(B)) startBoss(B); });
  // ?boss=boss1&preview → mở thẳng trận (cô xem trước)
  const bid = QP.get('boss'); if (bid && PREVIEW && !afterHomeBattle.done){ afterHomeBattle.done = true; const B = BOSSES.find(y => y.id === bid); if (B) startBoss(B); }
}
