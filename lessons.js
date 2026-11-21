/* =====================================================================
   B2 First Adventure – DỮ LIỆU BÀI HỌC
   (sách Grammar and Vocabulary for First and First for Schools)
   ---------------------------------------------------------------------
   • OPEN_WEEK: tuần đang mở. LESSONS[tuần] = mảng các bài của tuần (link ?w=tuần&b=số bài), mỗi bài nộp riêng.
     Hiện tại mỗi tuần 1 bài, xen kẽ Grammar / Vocabulary.
   • copy: false = ô New words chỉ để học (không bắt chép vở). drag: true = kéo thả / chạm từ trong khung vào chỗ trống.
   • ai / grammarImg / wordsImg = tên hình minh hoạ tạo bằng ChatGPT trong img/ai/<tên>.jpg (chưa có file thì tự ẩn).
     Các bài tuần trước vẫn mở để học sinh xem lại. Cô xem trước bài chưa mở: ?w=2&preview
   • Chữ highlight (bấm xem nghĩa + máy đọc): {{khoá}} hoặc {{khoá|chữ hiển thị}}; khoá phải có trong VOCAB.
   • newWords = ô "New words" (chép vở), CHỈ bài Vocabulary: từ thuộc nội dung chính của bài (B1 trở lên, từ dễ hơn chỉ khi ít gặp).
     newWordsAfter = từ chính nhưng là đáp án → chỉ hiện trong ô New words sau khi nộp xong.
     KHÔNG lấy từ trong câu lệnh đề bài (vẫn highlight), KHÔNG lấy từ là đáp án chưa hiện ra.
     Từ quá hiếm (C2, văn chương) chỉ highlight trong bài.
   • Chỗ làm bài:
       ((a/*b))          chọn 1 – dấu * là đáp án đúng
       [[x|y]]           ô gõ chữ, nhiều đáp án đúng ngăn bằng |
   • h: gợi ý (tiếng Việt, ngắn), chỉ hiện khi làm lại câu sai, KHÔNG ghi đáp án.
   • Bài: part = tiêu đề phần · stack = lựa chọn dài xếp dọc · type 'text' = đoạn văn, chỗ trống đánh số 1, 2, 3…
     box = khung từ (~ = từ đã dùng ở ví dụ) · only = chỉ chấp nhận từ trong khung · sents = câu A–G (Reading Part 6)
     track = audio trong audio/ · img = ảnh trong img/ · tip = mẹo làm bài
   ===================================================================== */
const OPEN_WEEK = 1;

// Máy chủ nhận bài (Code.gs dùng chung với các trang BTVN khác)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyAom9bBpL0ms0VD7_bz5w691011llkFzttYSjKDyRyMCjLLeUZ4EZGGJLtLMFWuiV4sA/exec';

/* ---------- TỪ MỚI: w = từ đọc to, ipa, vi = nghĩa tiếng Việt ---------- */
const VOCAB = {
  /* Unit 1 – Present tenses */
  'mend':           { w: 'mend', ipa: '/mend/', vi: 'sửa chữa (đồ bị hỏng)' },
  'pie':            { w: 'pie', ipa: '/paɪ/', vi: 'bánh nướng có nhân' },
  'odd':            { w: 'odd', ipa: '/ɒd/', vi: 'kỳ lạ, khác thường' },
  'suit':           { w: 'suit', ipa: '/suːt/', vi: 'bộ com-lê (áo vest + quần)' },
  'rude':           { w: 'rude', ipa: '/ruːd/', vi: 'thô lỗ, bất lịch sự' },
  'manners':        { w: 'manners', ipa: '/ˈmænəz/', vi: 'cách cư xử, phép lịch sự' },
  'bad-tempered':   { w: 'bad-tempered', ipa: '/ˌbædˈtempəd/', vi: 'nóng tính, hay cáu' },
  'in public':      { w: 'in public', ipa: '/ɪn ˈpʌblɪk/', vi: 'trước mặt mọi người, nơi công cộng' },
  'period':         { w: 'period', ipa: '/ˈpɪəriəd/', vi: 'giai đoạn, thời kỳ' },
  'motel':          { w: 'motel', ipa: '/məʊˈtel/', vi: 'nhà nghỉ ven đường (cho người đi ô tô)' },
  'portions':       { w: 'portions', ipa: '/ˈpɔːʃnz/', vi: 'suất ăn, khẩu phần' },
  'scenery':        { w: 'scenery', ipa: '/ˈsiːnəri/', vi: 'phong cảnh' },
  'behave':         { w: 'behave', ipa: '/bɪˈheɪv/', vi: 'cư xử' },
  'manner':         { w: 'manner', ipa: '/ˈmænə/', vi: 'cách, thái độ (in a friendly manner = một cách thân thiện)' },
  'strangers':      { w: 'strangers', ipa: '/ˈstreɪndʒəz/', vi: 'người lạ' },
  'realise':        { w: 'realise', ipa: '/ˈrɪəlaɪz/', vi: 'nhận ra' },
  'serve':          { w: 'serve', ipa: '/sɜːv/', vi: 'phục vụ, dọn (món ăn)' },
  'sound engineer': { w: 'sound engineer', ipa: '/ˈsaʊnd endʒɪˌnɪə/', vi: 'kỹ sư âm thanh' },
  'disc jockey':    { w: 'disc jockey', ipa: '/ˈdɪsk dʒɒki/', vi: 'DJ, người chọn và phát nhạc' },
  'venue':          { w: 'venue', ipa: '/ˈvenjuː/', vi: 'địa điểm tổ chức (buổi diễn, sự kiện)' },
  'rehearse':       { w: 'rehearse', ipa: '/rɪˈhɜːs/', vi: 'tập dượt (trước buổi diễn)' },
  'equipment':      { w: 'equipment', ipa: '/ɪˈkwɪpmənt/', vi: 'thiết bị' },
  'performers':     { w: 'performers', ipa: '/pəˈfɔːməz/', vi: 'người biểu diễn' },
  'appreciate':     { w: 'appreciate', ipa: '/əˈpriːʃieɪt/', vi: 'trân trọng, đánh giá cao' },
  'portable':       { w: 'portable', ipa: '/ˈpɔːtəbl/', vi: 'xách tay, dễ mang theo' },
  'quality':        { w: 'quality', ipa: '/ˈkwɒləti/', vi: 'phẩm chất, tố chất' },
  'practical':      { w: 'practical', ipa: '/ˈpræktɪkl/', vi: 'thực tế, thực hành' },

  /* Unit 25 – Earth, sea and sky */
  'bank':           { w: 'bank', ipa: '/bæŋk/', vi: 'bờ (sông)' },
  'orchards':       { w: 'orchards', ipa: '/ˈɔːtʃədz/', vi: 'vườn cây ăn quả' },
  'peaks':          { w: 'peaks', ipa: '/piːks/', vi: 'đỉnh núi' },
  'pine':           { w: 'pine', ipa: '/paɪn/', vi: 'cây thông' },
  'slopes':         { w: 'slopes', ipa: '/sləʊps/', vi: 'sườn dốc' },
  'springs':        { w: 'springs', ipa: '/sprɪŋz/', vi: 'suối (nước phun lên từ lòng đất)' },
  'streams':        { w: 'streams', ipa: '/striːmz/', vi: 'dòng suối nhỏ' },
  'tracks':         { w: 'tracks', ipa: '/træks/', vi: 'đường mòn' },
  'valleys':        { w: 'valleys', ipa: '/ˈvæliz/', vi: 'thung lũng' },
  'vegetation':     { w: 'vegetation', ipa: '/ˌvedʒəˈteɪʃn/', vi: 'thảm thực vật, cây cối' },
  'surrounded':     { w: 'surrounded', ipa: '/səˈraʊndɪd/', vi: 'được bao quanh' },
  'towering':       { w: 'towering', ipa: '/ˈtaʊərɪŋ/', vi: 'cao chót vót' },
  'snow-capped':    { w: 'snow-capped', ipa: '/ˈsnəʊ kæpt/', vi: 'có tuyết phủ trên đỉnh' },
  'dense':          { w: 'dense', ipa: '/dens/', vi: 'rậm rạp, dày đặc' },
  'shallow':        { w: 'shallow', ipa: '/ˈʃæləʊ/', vi: 'nông, cạn' },
  'landscape':      { w: 'landscape', ipa: '/ˈlændskeɪp/', vi: 'phong cảnh (đất đai, núi đồi)' },
  'breathtaking':   { w: 'breathtaking', ipa: '/ˈbreθteɪkɪŋ/', vi: 'đẹp ngoạn mục' },
  'fertile':        { w: 'fertile', ipa: '/ˈfɜːtaɪl/', vi: 'màu mỡ' },
  'winding':        { w: 'winding', ipa: '/ˈwaɪndɪŋ/', vi: 'quanh co, uốn lượn' },
  'emerge':         { w: 'emerge', ipa: '/iˈmɜːdʒ/', vi: 'trồi lên, xuất hiện' },
  'tend to':        { w: 'tend to', ipa: '/ˈtend tə/', vi: 'thường hay, có xu hướng' },
  'wildlife':       { w: 'wildlife', ipa: '/ˈwaɪldlaɪf/', vi: 'động vật hoang dã' },
  'cultivated':     { w: 'cultivated', ipa: '/ˈkʌltɪveɪtɪd/', vi: '(đất) được trồng trọt, canh tác' },
  'mountainous':    { w: 'mountainous', ipa: '/ˈmaʊntənəs/', vi: 'có nhiều núi' },
  'muddy':          { w: 'muddy', ipa: '/ˈmʌdi/', vi: 'lầy lội, đục bùn' },
  'steep':          { w: 'steep', ipa: '/stiːp/', vi: 'dốc đứng' },
  'narrow':         { w: 'narrow', ipa: '/ˈnærəʊ/', vi: 'hẹp' },
  'wild':           { w: 'wild', ipa: '/waɪld/', vi: '(đất) hoang dã, tự nhiên' },
  'flat':           { w: 'flat', ipa: '/flæt/', vi: 'bằng phẳng' },
  'gentle':         { w: 'gentle', ipa: '/ˈdʒentl/', vi: '(dốc) thoai thoải' },
  'freeze':         { w: 'freeze', ipa: '/friːz/', vi: 'đóng băng (freeze – froze – frozen)' },
  'globe':          { w: 'globe', ipa: '/ɡləʊb/', vi: 'quả địa cầu, thế giới' },
  'mist':           { w: 'mist', ipa: '/mɪst/', vi: 'sương mù' },
  'tropic':         { w: 'tropic', ipa: '/ˈtrɒpɪk/', vi: 'vùng nhiệt đới' },
  'forecast':       { w: 'forecast', ipa: '/ˈfɔːkɑːst/', vi: 'dự báo (thời tiết)' },
  'crash':          { w: 'crash', ipa: '/kræʃ/', vi: 'đập mạnh vào' },
  'stormy':         { w: 'stormy', ipa: '/ˈstɔːmi/', vi: 'có bão, giông gió' },
  /* Từ chính là đáp án: chỉ hiện trong ô New words sau khi nộp xong (newWordsAfter) */
  'trunks':         { w: 'trunks', ipa: '/trʌŋks/', vi: 'thân cây' },
  'sunlight':       { w: 'sunlight', ipa: '/ˈsʌnlaɪt/', vi: 'ánh nắng, ánh sáng mặt trời' },
  'soil':           { w: 'soil', ipa: '/sɔɪl/', vi: 'đất (trồng cây)' },
  'roots':          { w: 'roots', ipa: '/ruːts/', vi: 'rễ cây' },
  'branches':       { w: 'branches', ipa: '/ˈbrɑːntʃɪz/', vi: 'cành cây' },
  'insects':        { w: 'insects', ipa: '/ˈɪnsekts/', vi: 'côn trùng' },
  'frozen':         { w: 'frozen', ipa: '/ˈfrəʊzn/', vi: 'đóng băng' },
  'misty':          { w: 'misty', ipa: '/ˈmɪsti/', vi: 'có sương mù' },
  'tropical':       { w: 'tropical', ipa: '/ˈtrɒpɪkl/', vi: 'nhiệt đới' },
  'warmth':         { w: 'warmth', ipa: '/wɔːmθ/', vi: 'sự ấm áp, hơi ấm' },
  'global':         { w: 'global', ipa: '/ˈɡləʊbl/', vi: 'toàn cầu (global warming = sự nóng lên toàn cầu)' },
  /* Reading Part 6 – A trip to Patagonia */
  'pumas':          { w: 'pumas', ipa: '/ˈpjuːməz/', vi: 'báo sư tử (puma)' },
  'portion':        { w: 'portion', ipa: '/ˈpɔːʃn/', vi: 'một phần (của vùng đất)' },
  'lavished':       { w: 'lavished', ipa: '/ˈlævɪʃt/', vi: '(be lavished with) được ban tặng rất nhiều' },
  'glaciers':       { w: 'glaciers', ipa: '/ˈɡlæsiəz/', vi: 'sông băng' },
  'snow-clad':      { w: 'snow-clad', ipa: '/ˈsnəʊ klæd/', vi: 'phủ đầy tuyết' },
  'intrepid':       { w: 'intrepid', ipa: '/ɪnˈtrepɪd/', vi: 'gan dạ, dũng cảm' },
  'tackle':         { w: 'tackle', ipa: '/ˈtækl/', vi: 'đương đầu, chinh phục (việc khó)' },
  'formidable':     { w: 'formidable', ipa: '/fəˈmɪdəbl/', vi: 'đáng gờm, rất khó' },
  'trek':           { w: 'trek', ipa: '/trek/', vi: 'chuyến đi bộ đường dài (vất vả)' },
  'scrambling':     { w: 'scrambling', ipa: '/ˈskræmblɪŋ/', vi: 'leo trèo (bằng cả tay chân)' },
  'leisurely':      { w: 'leisurely', ipa: '/ˈleʒəli/', vi: 'thong thả, nhàn nhã' },
  'chauffeur-driven': { w: 'chauffeur-driven', ipa: '/ˈʃəʊfə ˌdrɪvn/', vi: 'có tài xế riêng lái' },
  'cubs':           { w: 'cubs', ipa: '/kʌbz/', vi: 'con non (của báo, sư tử, gấu…)' },
  'spot':           { w: 'spot', ipa: '/spɒt/', vi: 'phát hiện, nhìn thấy' },
  'strolling':      { w: 'strolling', ipa: '/ˈstrəʊlɪŋ/', vi: 'đi dạo thong thả' },
  'startling':      { w: 'startling', ipa: '/ˈstɑːtlɪŋ/', vi: 'gây giật mình, đáng kinh ngạc' },
  'plains':         { w: 'plains', ipa: '/pleɪnz/', vi: 'đồng bằng' },
  'majestic':       { w: 'majestic', ipa: '/məˈdʒestɪk/', vi: 'hùng vĩ, oai vệ' },
  'birds of prey':  { w: 'birds of prey', ipa: '/ˌbɜːdz əv ˈpreɪ/', vi: 'chim săn mồi (đại bàng, chim ưng…)' },
  'roams':          { w: 'roams', ipa: '/rəʊmz/', vi: 'đi lang thang' },
  'sighting':       { w: 'sighting', ipa: '/ˈsaɪtɪŋ/', vi: 'lần nhìn thấy (con vật hiếm…)' },
  'vulnerable':     { w: 'vulnerable', ipa: '/ˈvʌlnərəbl/', vi: 'dễ bị tổn thương, yếu thế' },
  'wilderness':     { w: 'wilderness', ipa: '/ˈwɪldənəs/', vi: 'vùng hoang dã' },
  'hearty':         { w: 'hearty', ipa: '/ˈhɑːti/', vi: '(bữa ăn) thịnh soạn' },
  'hurtled':        { w: 'hurtled', ipa: '/ˈhɜːtld/', vi: 'lao vun vút' },
  'breakneck':      { w: 'breakneck', ipa: '/ˈbreɪknek/', vi: '(tốc độ) cực nhanh, chóng mặt' },
  'exhilarated':    { w: 'exhilarated', ipa: '/ɪɡˈzɪləreɪtɪd/', vi: 'phấn khích, sảng khoái' },
  'utterly':        { w: 'utterly', ipa: '/ˈʌtəli/', vi: 'hoàn toàn' },
  'grazing':        { w: 'grazing', ipa: '/ˈɡreɪzɪŋ/', vi: 'đang gặm cỏ' },
  'lookout point':  { w: 'lookout point', ipa: '/ˈlʊkaʊt pɔɪnt/', vi: 'điểm ngắm cảnh (trên cao)' },
  'gallop':         { w: 'gallop', ipa: '/ˈɡæləp/', vi: '(ngựa) phi nước đại' },
  'fleeting':       { w: 'fleeting', ipa: '/ˈfliːtɪŋ/', vi: 'thoáng qua, chốc lát' },
  'glimpse':        { w: 'glimpse', ipa: '/ɡlɪmps/', vi: 'cái nhìn thoáng qua' },
  'crag':           { w: 'crag', ipa: '/kræɡ/', vi: 'vách đá dốc đứng' },
  'boulder':        { w: 'boulder', ipa: '/ˈbəʊldə/', vi: 'tảng đá lớn' },
  'upright':        { w: 'upright', ipa: '/ˈʌpraɪt/', vi: 'thẳng người, đứng vững (không ngã)' },
  'bolt':           { w: 'bolt', ipa: '/bəʊlt/', vi: '(a bolt of …) một luồng (cảm xúc) bất ngờ' },
  'thunderclap':    { w: 'thunderclap', ipa: '/ˈθʌndəklæp/', vi: 'tiếng sấm nổ' },
  'avalanche':      { w: 'avalanche', ipa: '/ˈævəlɑːnʃ/', vi: 'tuyết lở' },
  'disturbance':    { w: 'disturbance', ipa: '/dɪˈstɜːbəns/', vi: 'sự quấy rầy, phá vỡ (sự yên tĩnh)' },
  'guarantees':     { w: 'guarantees', ipa: '/ˌɡærənˈtiːz/', vi: 'sự đảm bảo' },
  'apparently':     { w: 'apparently', ipa: '/əˈpærəntli/', vi: 'nghe nói là, hình như' },
  'rumours':        { w: 'rumours', ipa: '/ˈruːməz/', vi: 'tin đồn' },
  'plentiful':      { w: 'plentiful', ipa: '/ˈplentɪfl/', vi: 'nhiều, dồi dào' },
};

/* ---------- BÀI HỌC THEO TUẦN ---------- */
const LESSONS = {
  /* ===================== TUẦN 1 – Grammar Unit 1 ===================== */
  1: [{
    kind: 'Grammar', icon: '📘', code: 'Unit 1', title: 'Present tenses',
    // Bài Grammar: có ô New words để HỌC KĨ (copy: false = không bắt chép vở)
    copy: false,
    newWords: ['mend', 'odd', 'rude', 'manners', 'bad-tempered', 'in public', 'portions', 'scenery', 'behave', 'manner',
      'strangers', 'venue', 'rehearse', 'performers', 'appreciate', 'portable'],
    grammarImg: 'u1-grammar',
    // Ô Grammar: tóm tắt thật ngắn, ví dụ KHÔNG trùng với câu / động từ trong bài tập
    grammar: `
      <h4>1. Hiện tại đơn: V / V-s</h4>
      <ul>
        <li>Thói quen, việc lặp lại (<i>every week, usually, never</i>): <i>My cousin <b>plays</b> tennis on Sundays.</i></li>
        <li>Sự thật, tình huống lâu dài: <i>Water <b>boils</b> at 100°C. Tom <b>works</b> in a hospital.</i></li>
      </ul>
      <h4>2. Hiện tại tiếp diễn: am / is / are + V-ing</h4>
      <ul>
        <li>Đang xảy ra lúc nói: <i>Look! It<b>’s snowing</b>.</i></li>
        <li>Tạm thời, quanh thời điểm hiện tại (<i>this week, at the moment</i>): <i>I<b>’m reading</b> a great book at the moment.</i></li>
        <li>Đang thay đổi dần: <i>The city <b>is growing</b> fast.</i></li>
        <li><b>always</b> + V-ing = phàn nàn, chê: <i>He<b>’s always losing</b> his keys!</i></li>
      </ul>
      <h4>3. Động từ trạng thái: thường KHÔNG dùng -ing</h4>
      <ul>
        <li>Suy nghĩ: <i>believe, understand, remember, suppose…</i> · Cảm xúc: <i>hate, prefer, want, wish…</i></li>
        <li>Sở hữu: <i>own, belong, possess…</i> · Giác quan: <i>hear, taste…</i> · Khác: <i>contain, matter, weigh, deserve…</i></li>
        <li><i>I <b>believe</b> you.</i> (không nói <s>I’m believing</s>)</li>
      </ul>
      <h4>4. Ngoại lệ: lúc đó là HÀNH ĐỘNG → dùng -ing được</h4>
      <ul>
        <li><b>think about / of</b> = đang suy nghĩ: <i>I<b>’m thinking of</b> buying a bike.</i> (khác: <i>I think</i> = tôi cho rằng)</li>
        <li><b>have</b> không mang nghĩa sở hữu: <i>We<b>’re having</b> a party.</i></li>
        <li><b>taste</b> = đang nếm: <i>The chef <b>is tasting</b> the soup.</i> (khác: <i>The soup <b>tastes</b> salty.</i>)</li>
        <li><b>be</b> + -ing = cư xử khác thường, tạm thời: <i>You<b>’re being</b> very lazy today!</i></li>
      </ul>`,
    ex: [
      /* Bài 1 (Grammar ex 1) – chọn câu đúng */
      { id: 'g1', type: 'list', stack: true,
        title: 'Choose the correct sentence',
        how: 'Tap the correct sentence in each pair.',
        examples: [ '((a. My brother lives with us until he can find a flat of his own./*b. My brother is living with us until he can find a flat of his own.))' ],
        items: [
          { t: '((*a. Megan goes to Hong Kong every January./b. Megan’s going to Hong Kong every January.))', h: '“every January” = việc lặp lại đều đặn mỗi năm.' },
          { t: '((*a. I don’t have enough money for a long holiday this year./b. I’m not having enough money for a long holiday this year.))', h: '“have” ở đây có nghĩa là sở hữu (có tiền). Xem mục 3 và 4 trong ô Grammar.' },
          { t: '((*a. Everyone needs a break from work sometimes./b. Everyone is needing a break from work sometimes.))', h: '“need” thuộc nhóm động từ nào? Xem mục 3 trong ô Grammar.' },
          { t: '((a. What {{period}} of history do you study this term?/*b. What period of history are you studying this term?))', h: '“this term” = học kỳ này: việc tạm thời, quanh thời điểm hiện tại.' },
          { t: '((a. The team manager looks {{bad-tempered}} {{in public}}, but he’s always being very kind to young players./*b. The team manager looks bad-tempered in public, but he’s always very kind to young players.))', h: 'Câu nói về tính cách vốn có của ông ấy, không phải cách cư xử tạm thời. Không có ý phàn nàn.' },
        ] },

      /* Bài 2 (Grammar ex 2) – chia động từ */
      { id: 'g2', type: 'list',
        title: 'Present simple or present continuous?',
        how: 'Complete the sentences with the present simple or present continuous form of the verbs in brackets.',
        examples: [ 'My father [[knows]] (know) all about {{mend|mending}} cars, but nothing about bicycles.' ],
        items: [
          { t: 'This {{pie}} [[smells]] (smell) a bit {{odd}}. What’s in it?', h: '“smell” ở đây = có mùi (tính chất của cái bánh), không phải hành động ngửi.' },
          { t: 'I [[like]] (like) the jacket of this {{suit}}, but unfortunately the trousers [[don’t fit|do not fit]] (not fit) me any more.',
            h: ['Sở thích, cảm xúc: xem mục 3 trong ô Grammar.', '“fit” (vừa vặn) là động từ trạng thái. Chủ ngữ “the trousers” là số nhiều; câu phủ định.'] },
          { t: 'You’re very quiet this evening. What [[are you thinking]] (you / think) about?', h: '“think about” ở đây = đang suy nghĩ trong đầu ngay lúc này. Nhớ trật tự câu hỏi.' },
          { t: 'Who [[is]] (be) that man? Why [[is your sister being]] (your sister / be) so {{rude}} to him? She [[has]] (have) such beautiful {{manners}} normally.',
            h: ['Hỏi người đó là ai: “be” bình thường dùng thì đơn.', 'Cách cư xử tạm thời, khác với bình thường (normally). Xem mục 4 trong ô Grammar. Nhớ trật tự câu hỏi.', '“have” = có, sở hữu (cách cư xử đẹp). Chủ ngữ “she”.'] },
        ] },

      /* Bài 3 (Grammar ex 4) – email, 19 chỗ trống */
      { id: 'g4', type: 'text', side: true, ai: 'u1-roadtrip',
        title: 'An email from the USA',
        how: 'Complete the email with the present simple or present continuous form of the verbs in the box.',
        box: ['{{behave}}', 'come', 'cost', 'eat', 'enjoy', 'feel', '~go', 'have', 'like', 'love', 'pay', '{{realise}}', 'say', 'seem', '{{serve}}', 'show', 'smile', 'stay', 'take', 'visit'],
        paras: [
          { t: 'Dear Stephanie,' },
          { t: 'How are you? We’re fine. Our trip round the States <span class="exv">is going</span> well and we [[’re enjoying|are enjoying]] ourselves a lot. One good surprise is that things [[cost]] less here than back home. For example, this weekend we [[’re staying|are staying]] in a {{motel}} beside a lake and we [[’re paying|are paying]] only $65 per night for a room with a beautiful view.',
            h: ['Chuyến đi đang diễn ra (tạm thời).', 'Sự thật chung về giá cả ở đây.', '“this weekend”: việc tạm thời, đang diễn ra.', 'Việc tạm thời trong chuyến đi này.'] },
          { t: 'The only thing we [[don’t like|do not like]] (not) much is the food. Restaurants [[serve]] dinner rather early. We [[never eat]] (never) at six o’clock at home so we [[don’t feel|do not feel]] (not) hungry then and American {{portions}} [[seem]] very big to us. Apart from that, we [[’re having|are having]] a wonderful time. We [[’re visiting|are visiting]] lots of interesting little towns and we absolutely [[love]] the {{scenery}}.',
            h: ['Sở thích → động từ trạng thái. Câu phủ định.', 'Thói quen chung của các nhà hàng ở đây.', 'Thói quen ở nhà. Nhớ vị trí của “never”.', 'Cảm giác thường có vào giờ đó (thói quen chung). Câu phủ định.', 'Động từ trạng thái (mục 3 trong ô Grammar).', '“have a wonderful time” không mang nghĩa sở hữu. Xem mục 4.', 'Việc đang làm trong chuyến đi (tạm thời).', 'Cảm xúc → động từ trạng thái.'] },
          { t: 'People here [[behave]] in a very friendly {{manner}} towards {{strangers}}. All the shop assistants [[smile]] at us, and everyone [[says]] ‘Have a nice day!’ At home, the TV [[is always showing|’s always showing|always shows]] (always) us bad news stories about the States, but in fact, when you [[come]] here, you [[realise|realize]] it’s a really great place.',
            h: ['Sự thật chung về người dân ở đây.', 'Thói quen chung.', 'Chủ ngữ “everyone” là số ít.', '“always” + ý chê, phàn nàn: xem mục 2 trong ô Grammar.', 'Mệnh đề “when” nói về sự thật chung.', '“realise” = nhận ra (suy nghĩ) → động từ trạng thái.'] },
          { t: 'We [[’re taking|are taking]] lots of photos to show you.', h: 'Việc đang làm trong chuyến đi (tạm thời).' },
          { t: 'Much love,<br>Mick and Mary' },
        ] },

      /* Bài 4 – Listening Part 4 (không lấy Grammar focus task) */
      { id: 'lis4', type: 'list', stack: true, track: 'u1-listening', ai: 'u1-sound-engineer',
        title: 'Listening Part 4: a sound engineer',
        how: 'You will hear an interview with Martin Holloway, a {{sound engineer}}. Choose the best answer (A, B or C).',
        items: [
          { t: 'The mistake people make about sound engineers is to think that ((A. they spend most of their time working indoors./*B. their job is the same as that of a {{disc jockey}}./C. they are responsible for the quality of the music.))',
            h: 'Nghe đoạn đầu, khi Martin nói người ta hay gọi nhầm anh ấy là gì.' },
          { t: 'What does Martin say helped him to begin earning money? ((A. the course he did/B. some of the bands he played in/*C. some people he met))',
            h: 'Nghe đoạn Martin kể thời học đại học. Chú ý chỗ có “paid work”.' },
          { t: 'Martin first gets involved in a project ((*A. as soon as the band is booked./B. when he visits the {{venue}}./C. while the band is {{rehearse|rehearsing}}.))',
            h: 'Nghe đoạn “when does a project begin”. Chú ý câu “But it all begins before that…”.' },
          { t: 'What does Martin often find during a show? ((A. There are problems with the {{equipment}}./*B. Very little goes wrong for him./C. The {{performers}} don’t communicate with him.))',
            h: 'Nghe đoạn “during a show”: nếu chuẩn bị kỹ thì trong buổi diễn anh ấy có nhiều việc phải làm không?' },
          { t: 'What change in equipment has Martin {{appreciate|appreciated}} the most over the years? ((*A. It is more {{portable}}./B. The sound quality is better./C. It is less expensive.))',
            h: 'Martin nói đến 3 thay đổi, nhưng chỉ 1 cái “helped me enormously”.' },
          { t: 'According to Martin, what is the most important {{quality}} in a sound engineer? ((A. some musical ability/*B. good communication skills/C. {{practical}} technical knowledge))',
            h: 'Nghe đoạn “I’m always telling people…”: điều gì là “crucial”?' },
          { t: 'What does Martin find most difficult about his job? ((A. working in difficult environments/B. being away for periods of time/*C. waiting for things to happen))',
            h: 'Nghe đoạn cuối: Martin nói mình “not a very patient person”…' },
        ] },

    ],
  }],

  /* ===================== TUẦN 2 – Vocabulary Unit 25 ===================== */
  2: [{
    kind: 'Vocabulary', icon: '🌍', code: 'Unit 25', title: 'Earth, sea and sky',
    // Ô chép vở: CHỈ từ thuộc nội dung chính của bài (địa lý, phong cảnh, khí hậu, thời tiết).
    // Từ khó khác trong bài chỉ highlight. newWordsAfter = từ chính là đáp án → chỉ hiện sau khi nộp xong.
    // ~20 từ chính: 13 hiện sẵn + 7 hiện sau khi nộp xong (là đáp án)
    newWords: ['peaks', 'slopes', 'valleys', 'streams', 'springs', 'orchards', 'vegetation', 'landscape', 'shallow', 'winding',
      'cultivated', 'mountainous', 'steep'],
    newWordsAfter: ['trunks', 'roots', 'branches', 'soil', 'frozen', 'misty', 'tropical'],
    wordsImg: 'u25-landscape',
    ex: [
      /* Bài 1 (Unit 25 – 1.2) – Manali */
      { id: 'v12', type: 'text', drag: true, img: 'u25-manali.jpg',
        only: ['bank', 'orchards', 'pine', 'slopes', 'springs', 'streams', 'tracks', 'valleys', 'vegetation'],
        title: 'Manali, India',
        how: 'Complete the description with the words in the box.',
        box: ['{{bank}}', '{{orchards}}', '~peaks', '{{pine}}', '{{slopes}}', '{{springs}}', '{{streams}}', '{{tracks}}', '{{valleys}}', '{{vegetation}}'],
        paras: [
          { t: 'Manali is {{surrounded}} by {{towering}} {{snow-capped}} mountain <span class="exv">peaks</span> and {{dense}} forests of [[pine]] trees. {{shallow|Shallow}} [[streams]] of clear mountain water flow into the Beas River. Around the town the {{landscape}} is {{breathtaking}}. The [[vegetation]] which covers the {{gentle}} wooded [[slopes]] of the hillsides is mainly wild flowers and {{fertile}} apple [[orchards]].',
            h: ['Một loại cây lá kim mọc nhiều ở vùng núi lạnh (Đà Lạt có rất nhiều).', 'Dòng nước nhỏ chảy ra sông. Số nhiều.', 'Từ chung chỉ cây cối, cỏ hoa của một vùng.', 'Phần đất nghiêng của sườn đồi. Số nhiều.', 'Nơi trồng nhiều cây ăn quả. Số nhiều.'] },
          { t: 'Above Manali, travellers can walk along the {{winding}} [[tracks]] through the {{narrow}} [[valleys]] and high mountain passes to the Himalayas or take part in the adventure sports on offer. They can also relax in the village of Vashisht, on the left [[bank]] of the Beas River just a few kilometres from Manali, where hot [[springs]] {{emerge}} from the rock at about 50 degrees centigrade.',
            h: ['Đường mòn nhỏ để đi bộ. Số nhiều.', 'Vùng đất thấp nằm giữa các ngọn núi. Số nhiều.', 'Phần đất dọc hai bên sông.', 'Nơi nước nóng tự trào lên từ lòng đất. Số nhiều.'] },
        ] },

      /* Bài 2 (Unit 25 – 1.3) – nghe: rainforest */
      { id: 'v13', type: 'text', track: 'u25-rainforest', ai: 'u25-rainforest',
        title: 'A tropical rainforest',
        how: 'Listen to the description of this photo and complete it with the words you hear.',
        paras: [
          { t: 'This is a tropical rainforest. It’s also sometimes called a <span class="exv">jungle</span>. The trees are probably very old as they have very thick [[trunks]]. It’s usually quite dark in the forest as not much [[sunlight|sun light]] gets through the trees. The [[plants]] that grow under the trees {{tend to|tend}} to have large [[leaves]] in an effort to get as much light as possible.',
            h: ['Phần thân to của cây. Số nhiều.', 'Ánh sáng của mặt trời (1 từ ghép).', 'Từ chung chỉ cây cỏ nói chung. Số nhiều.', 'Bộ phận màu xanh của cây hứng ánh sáng. Chú ý chính tả số nhiều.'] },
          { t: 'The [[soil]] in the rainforest is often very poor so the trees have {{shallow}} [[roots]], but some of them still manage to grow very tall with few [[branches]] near the bottom. They put all their energy into reaching the light! Rainforests are full of {{wildlife}}, from [[insects]] and snakes on the forest floor to monkeys and [[butterflies]] higher up.',
            h: ['Lớp đất cây mọc lên.', 'Phần của cây nằm dưới đất. Số nhiều.', 'Phần mọc ra từ thân cây. Số nhiều.', 'Những con vật nhỏ có 6 chân. Số nhiều.', 'Con vật bay, cánh nhiều màu. Chú ý chính tả số nhiều của từ tận cùng bằng -y.'] },
        ] },

      /* Bài 3 (Unit 25 – 1.4) – từ trái nghĩa */
      { id: 'v14', type: 'list', drag: true,
        only: ['cultivated', 'mountainous', 'muddy', 'steep', 'straight', 'wide'],
        title: 'Opposites',
        how: 'Match the adjectives with their opposites. Write one word from the box.',
        box: ['{{cultivated}}', '~deep', '{{mountainous}}', '{{muddy}}', '{{steep}}', 'straight', 'wide'],
        examples: [ '{{shallow}} ↔ [[deep]]' ],
        items: [
          { t: '{{narrow}} ↔ [[wide]]', h: '“narrow” = hẹp.' },
          { t: '{{winding}} ↔ [[straight]]', h: '“winding” = quanh co, uốn lượn.' },
          { t: 'clear ↔ [[muddy]]', h: '“clear” ở đây nói về nước trong vắt.' },
          { t: '{{wild}} ↔ [[cultivated]]', h: '“wild” (đất) = hoang dã, chưa có ai trồng trọt.' },
          { t: '{{flat}} ↔ [[mountainous]]', h: '“flat” (vùng đất) = bằng phẳng.' },
          { t: '{{gentle}} ↔ [[steep]]', h: '“gentle” (con dốc) = thoai thoải.' },
        ] },

      /* Bài 4 (Unit 25 – 3.1) – word building */
      { id: 'v31', type: 'list', side: true, pics: [0, 1, 2, 3, 4, 5].map(i => 'u25-weather-' + i),
        title: 'Word building',
        how: 'Complete the sentences with new words made from the words in the box.',
        box: ['{{freeze}}', '{{globe}}', '{{mist}}', '~storm', '{{tropic}}', 'warm'],
        examples: [ 'Yesterday the weather was so [[stormy]] that the waves were {{crash|crashing}} against the houses by the beach.' ],
        items: [
          { t: 'They were able to skate on the lake because it was [[frozen]].', h: 'Cần tính từ sau “was”. “freeze” là động từ bất quy tắc: freeze – froze – ?' },
          { t: 'We climbed to the top of the mountain but it was so [[misty]] we couldn’t see much.', h: 'Cần tính từ sau “so”. Làm giống ví dụ (storm → ?).' },
          { t: 'Everybody is staying inside as the {{forecast}} says a [[tropical]] storm is on its way.', h: 'Cần tính từ đứng trước danh từ “storm”. Đuôi tính từ hay gặp: -y, -al, -ic…' },
          { t: 'We always {{appreciate}} the [[warmth]] of the sun after a long cold winter.', h: 'Sau “the … of” cần danh từ (giống strong → strength).' },
          { t: 'It is thought that some unusual weather is caused by [[global]] warming.', h: 'Cần tính từ đứng trước “warming”. Hiện tượng “nóng lên toàn cầu”.' },
        ] },

      /* Bài 5 – Reading and Use of English Part 6 (không lấy Writing) */
      { id: 'rue6', type: 'text', drag: true, ai: 'u25-patagonia',
        title: 'Reading Part 6: A trip to Patagonia',
        how: 'Six sentences have been removed from the article. Choose from the sentences A–G the one which fits each gap. There is one extra sentence.',
        tip: 'Đọc cả đoạn, chọn câu khớp với ý <b>cả trước và sau</b> chỗ trống. Chú ý các từ nối và đại từ (it, this, therefore…).',
        sents: [
          'At that point, I was more focused on staying {{upright}} than {{spot|spotting}} pumas.',
          'Suddenly, a {{fleeting}} shadow sent a {{bolt}} of excitement through us.',
          'My goal, on the other hand, was to {{spot}} Patagonia’s rare big cats and other {{wildlife}}.',
          'The {{thunderclap}} of a distant {{avalanche}} was the only {{disturbance}} of the peace.',
          'But with only 50 of these large cats in a huge area, there were still no {{guarantees}}.',
          '{{apparently|Apparently}}, the best thing to do is stand completely still and all should be well.',
          '{{rumours|Rumours}} of recent puma {{sighting|sightings}} were {{plentiful}}.',
        ],
        paras: [
          { t: '<b class="ph">A trip to Patagonia</b><br><i>Laura Holt goes in search of {{pumas}}, the large wild cats of South America</i>' },
          { t: 'Taking in a large area of Chile and Argentina, running along the Andes and down to where South America flicks its tail towards Antarctica, is a region called Patagonia and I was there on holiday. It was only my first day in the Torres del Paine National Park, a wild {{portion}} of Chilean Patagonia that’s {{lavished}} with {{towering}} {{glaciers}}, {{snow-clad}} valleys and dramatic peaks.' },
          { t: 'Some other {{intrepid}} travellers come here to {{tackle}} the {{formidable}} ‘W’ circuit – an extended {{trek}} that links five key points in the national park over several days of {{scrambling}} up and down mountains. [[C]] I therefore planned to take a more {{leisurely}} pace, in the back of a {{chauffeur-driven}} van.',
            h: 'Câu trước nói về “other travellers”. Câu sau có “therefore”. Câu trống nói gì về chính tác giả?' },
          { t: 'We gathered around a fire on the first night at camp. [[G]] A mother and her {{cubs}} had been {{spot|spotted}} in the valley days before and a lone male had been seen casually {{strolling}} across the camp’s wooden walkways. But by far the most {{startling}} tale was of a young puma cub which had found its way through an unlocked door into a hotel.',
            h: 'Sau chỗ trống là nhiều câu chuyện người ta kể bên đống lửa. Câu nào giới thiệu những câu chuyện đó?' },
          { t: 'The next morning, we drove into the Patagonian {{plains}}. Overhead, {{majestic}} {{birds of prey}} carved black shadows against a brilliant blue sky. At Lake Sarmiento, oystercatchers squawked as we approached and elegant ostrich-like rheas pranced past like ballerinas. [[B]] It was too large to be a grey fox and too small to be a guanaco, the curious llama-like creature that {{roams}} these lands.',
            h: 'Câu sau bắt đầu bằng “It was too large…”: “It” là thứ gì vừa xuất hiện trong câu trống?' },
          { t: '‘Did you see that?’, my guide, Felipe, pointed. ‘Puma?’ I replied. ‘I think so,’ said Felipe. A {{sighting}} of this size was so lucky. Even if it was over in a flash. But I suddenly felt {{vulnerable}}, out there in the {{wilderness}}, with nothing but a stick to defend myself if it came near. [[F]] Even so, I hoped I wouldn’t have to put the theory to the test.',
            h: 'Câu sau nhắc đến “the theory” (cách làm theo lý thuyết). Câu trống phải nói ra cách đó.' },
          { t: 'After a {{hearty}} barbecue beside the Blue Lagoon, it was time to set off again. We {{hurtled}} down unmade mountain roads at {{breakneck}} speed, past the milky green glacial flow of the Paine River. [[A]] But I was soon back at the camp, {{exhilarated}} and {{utterly}} exhausted.',
            h: 'Câu trước tả xe lao rất nhanh trên đường núi gồ ghề. Lúc đó tác giả lo điều gì?' },
          { t: 'Over the next few days, the pace picked up steadily. There was a walk up to the Mirador Cuernos, through silent valleys of {{grazing}} animals, to a startling {{lookout point}}. [[D]] On the way down, we watched herds of horses {{gallop}} past isolated farms with red corrugated roofs.',
            h: 'Câu trước tả những thung lũng “silent”. Câu trống tiếp tục ý đó.' },
          { t: 'On the final day I said goodbye and drove out of the park. The closest I had come to seeing a puma may have been a {{fleeting}} {{glimpse}} but I realised it mattered little. For my search had made me study every {{crag}} and cave, bush and {{boulder}} in this vast, ultimately unknowable land all the more intensely.' },
        ] },
    ],
  }],
};

/* =====================================================================
   BOSS FIGHT – mini mock test B2 First (Use of English Part 1–4), mở sau mỗi 4 tuần.
   Câu hỏi soạn mới, chỉ dùng ngữ pháp + từ vựng các Unit đã học. Cùng cú pháp với bài học:
   ((a/*b)) chọn · [[x|y]] gõ chữ. p = Part (1–4). ult: true = câu ULTIMATE (khó, gây/nhận sát thương x2).
   Part 3: base = từ gốc (IN HOA). Part 4: first = câu gốc, key = từ cho sẵn.
   after = mở khi OPEN_WEEK >= after (cô xem trước: ?boss=boss1&preview).
   ===================================================================== */
const BOSSES = [
  { id: 'boss1', after: 4, name: 'Tense Titan', img: 'boss-1', units: 'Unit 1 · Unit 25',
    qs: [
      { p: 1, t: 'From the top of the hill we had a breathtaking ((*view/sight/look/scene)) of the whole valley.', h: 'have a … of something = nhìn thấy toàn cảnh.' },
      { p: 1, t: 'The path to the waterfall was very ((*steep/high/tall/sharp)), so we walked slowly.', h: 'Đường dốc đứng, khó đi lên.' },
      { p: 1, t: 'We stopped next to a small ((*stream/wave/tide/current)) to fill our water bottles.', h: 'Dòng nước nhỏ chảy trên núi.' },
      { p: 1, t: 'In the evening a thick ((*fog/smoke/steam/dust)) came down and we could hardly see the road.', h: 'Hiện tượng thời tiết làm khó nhìn thấy đường.' },
      { p: 2, t: 'Hi Sam! I [[am]] writing to you from a campsite in the mountains.', h: 'Việc đang làm ngay lúc viết thư.' },
      { p: 2, t: 'We [[are]] staying here until Sunday, and then we drive home.', h: 'Kế hoạch / việc tạm thời: hiện tại tiếp diễn.' },
      { p: 2, t: 'Every morning we get up early, but today it is raining, so we [[are|\'re]] playing cards in the tent.', h: 'Việc đang diễn ra lúc này.' },
      { p: 2, t: 'What [[do]] you usually do at the weekend?', h: 'Câu hỏi về thói quen: hiện tại đơn.' },
      { p: 3, base: 'ROCK', t: 'We climbed up a narrow [[rocky]] path to reach the top.', h: 'Cần tính từ đứng trước danh từ “path”.' },
      { p: 3, base: 'FOG', t: 'It was such a [[foggy]] morning that we couldn’t see the lake.', h: 'Tính từ chỉ thời tiết, đuôi giống “misty”.' },
      { p: 3, base: 'BREATH', t: 'The view from the summit was absolutely [[breathtaking]].', h: 'Tính từ ghép: đẹp đến “nín thở”.', ult: true },
      { p: 3, base: 'DANGER', t: 'Swimming in the river can be [[dangerous]] after heavy rain.', h: 'Cần tính từ sau “be”.' },
      { p: 4, first: 'There is a strange taste in this milk.', key: 'TASTES', t: 'This milk [[tastes strange|tastes a bit strange|tastes very strange]].', h: '“taste” là động từ trạng thái: dùng thì đơn.', ult: true },
      { p: 4, first: 'It annoys me that Tom arrives late so often.', key: 'ALWAYS', t: 'Tom [[is always arriving late|\'s always arriving late|is always coming late|\'s always coming late]], which annoys me.', h: '“always” + hiện tại tiếp diễn để phàn nàn.', ult: true },
      { p: 4, first: 'This bike belongs to my brother.', key: 'OWNS', t: 'My brother [[owns this bike]].', h: 'Động từ trạng thái chỉ sở hữu.', ult: true },
      { p: 4, first: 'What’s your opinion of the new teacher?', key: 'THINK', t: 'What [[do you think of|do you think about]] the new teacher?', h: '“think” = có ý kiến → thì đơn.', ult: true },
    ] },
];

/* =====================================================================
   SIDE QUEST – video cô tự làm (Google Drive, chia sẻ "Bất kỳ ai có đường liên kết").
   Mỗi quest là 1 bài như bài tuần (cùng cú pháp), thêm: id, week (mở khi OPEN_WEEK >= week),
   video = ID file Drive (phần giữa /d/…/view), mins = độ dài video.
   newWords = từ cần chép vở. Link riêng: ?sq=<id> (cô xem trước: &preview).
   ===================================================================== */
const SIDEQUESTS = [];
