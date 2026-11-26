/* =====================================================================
   B2 First Adventure – DỮ LIỆU BÀI HỌC
   (sách Grammar and Vocabulary for First and First for Schools)
   ---------------------------------------------------------------------
   • OPEN_WEEK: tuần đang mở. LESSONS[tuần] = mảng các bài của tuần (link ?w=tuần&b=số bài), mỗi bài nộp riêng.
     Tuần 1 = Grammar Unit 1 + Vocabulary Unit 25 (?w=1&b=1, ?w=1&b=2) · tuần 2 = Grammar Unit 2 (?w=2&b=1).
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
// tuần 2 = Grammar Unit 2 (mở 24/11)
/* ---- MỞ TUẦN ----
   OPEN_WEEK_SET = tuần mở tay (như trước đây). OPEN_DATES = ngày TỰ MỞ từng tuần (0h giờ Việt Nam), VD { 3: '2026-12-01', 4: '2026-12-08' }:
   đến ngày đó tuần tự mở, không cần sửa số. Chỉ tự mở khi tuần đó đã có bài. Tuần chưa mở vẫn xem trước được bằng ?preview. */
const OPEN_WEEK_SET = 2;
const OPEN_DATES = {};

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

  /* Unit 2 – Past tenses */
  'coach':          { w: 'coach', ipa: '/kəʊtʃ/', vi: 'xe khách đường dài' },
  'revision':       { w: 'revision', ipa: '/rɪˈvɪʒn/', vi: 'việc ôn bài (trước kỳ thi)' },
  'queue':          { w: 'queue', ipa: '/kjuː/', vi: 'xếp hàng (chờ đến lượt)' },
  'autograph':      { w: 'autograph', ipa: '/ˈɔːtəɡrɑːf/', vi: 'chữ ký (của người nổi tiếng)' },
  'embarrass':      { w: 'embarrass', ipa: '/ɪmˈbærəs/', vi: 'làm ai ngượng, xấu hổ' },
  'worry':          { w: 'worry', ipa: '/ˈwʌri/', vi: 'lo lắng' },
  'diary':          { w: 'diary', ipa: '/ˈdaɪəri/', vi: 'nhật ký' },
  'application form': { w: 'application form', ipa: '/ˌæplɪˈkeɪʃn fɔːm/', vi: 'mẫu đơn đăng ký' },
  'receptionist':   { w: 'receptionist', ipa: '/rɪˈsepʃənɪst/', vi: 'nhân viên lễ tân' },
  'crash pc':       { w: 'crash', ipa: '/kræʃ/', vi: '(máy tính) bị treo, bị sập' },
  'depressed':      { w: 'depressed', ipa: '/dɪˈprest/', vi: 'chán nản, buồn bã' },
  'pay rise':       { w: 'pay rise', ipa: '/ˈpeɪ raɪz/', vi: 'sự tăng lương' },
  'independent':    { w: 'independent', ipa: '/ˌɪndɪˈpendənt/', vi: 'tự lập, không dựa vào người khác' },
  'ground floor':   { w: 'ground floor', ipa: '/ˌɡraʊnd ˈflɔː/', vi: 'tầng trệt' },
  'thieves':        { w: 'thieves', ipa: '/θiːvz/', vi: 'những kẻ trộm (số ít: thief)' },
  'break into':     { w: 'break into', ipa: '/ˌbreɪk ˈɪntuː/', vi: 'đột nhập (vào nhà, xe…)' },
  'tune':           { w: 'tune', ipa: '/tjuːn/', vi: 'giai điệu' },
  'hit songs':      { w: 'hit songs', ipa: '/ˈhɪt sɒŋz/', vi: 'những bài hát ăn khách' },
  'ancient':        { w: 'ancient', ipa: '/ˈeɪnʃənt/', vi: 'rất cũ, cổ' },
  'amazed':         { w: 'amazed', ipa: '/əˈmeɪzd/', vi: 'kinh ngạc, rất ngạc nhiên' },

  /* Unit 26 – Living a healthy life */
  'vitamins':       { w: 'vitamins', ipa: '/ˈvɪtəmɪnz/', vi: 'vitamin' },
  'protein':        { w: 'protein', ipa: '/ˈprəʊtiːn/', vi: 'chất đạm' },
  'fibre':          { w: 'fibre', ipa: '/ˈfaɪbə/', vi: 'chất xơ' },
  'carbohydrate':   { w: 'carbohydrate', ipa: '/ˌkɑːbəʊˈhaɪdreɪt/', vi: 'tinh bột, chất bột đường' },
  'calories':       { w: 'calories', ipa: '/ˈkæləriz/', vi: 'calo (năng lượng trong thức ăn)' },
  'lean meat':      { w: 'lean meat', ipa: '/ˌliːn ˈmiːt/', vi: 'thịt nạc' },
  'dairy products': { w: 'dairy products', ipa: '/ˈdeəri ˌprɒdʌkts/', vi: 'các sản phẩm từ sữa' },
  'junk food':      { w: 'junk food', ipa: '/ˈdʒʌŋk fuːd/', vi: 'đồ ăn nhanh / ăn vặt không lành mạnh' },
  'immune system':  { w: 'immune system', ipa: '/ɪˈmjuːn ˌsɪstəm/', vi: 'hệ miễn dịch' },
  'blister':        { w: 'blister', ipa: '/ˈblɪstə/', vi: 'vết phồng rộp (trên da)' },
  'sore throat':    { w: 'sore throat', ipa: '/ˌsɔː ˈθrəʊt/', vi: 'đau họng' },
  'stomach upset':  { w: 'stomach upset', ipa: '/ˈstʌmək ˌʌpset/', vi: 'đau bụng, rối loạn tiêu hoá' },
  'run down':       { w: 'run down', ipa: '/ˌrʌn ˈdaʊn/', vi: 'mệt mỏi, suy nhược' },
  'jet-lagged':     { w: 'jet-lagged', ipa: '/ˈdʒet læɡd/', vi: 'mệt vì lệch múi giờ (sau chuyến bay dài)' },
  'hay fever':      { w: 'hay fever', ipa: '/ˈheɪ fiːvə/', vi: 'dị ứng phấn hoa' },
  'casualty department': { w: 'casualty department', ipa: '/ˈkæʒuəlti dɪˌpɑːtmənt/', vi: 'phòng cấp cứu (bệnh viện)' },
  'stitches':       { w: 'stitches', ipa: '/ˈstɪtʃɪz/', vi: 'mũi khâu (vết thương)' },
  'scars':          { w: 'scars', ipa: '/skɑːz/', vi: 'sẹo' },
  'anaesthetic':    { w: 'anaesthetic', ipa: '/ˌænəsˈθetɪk/', vi: 'thuốc gây tê / gây mê' },
  'antihistamines': { w: 'antihistamines', ipa: '/ˌæntiˈhɪstəmiːnz/', vi: 'thuốc chống dị ứng' },
  'antibiotics':    { w: 'antibiotics', ipa: '/ˌæntibaɪˈɒtɪks/', vi: 'thuốc kháng sinh' },
  'prescription':   { w: 'prescription', ipa: '/prɪˈskrɪpʃn/', vi: 'đơn thuốc (bác sĩ kê)' },
  'recipe':         { w: 'recipe', ipa: '/ˈresəpi/', vi: 'công thức nấu ăn' },
  'pharmacy':       { w: 'pharmacy', ipa: '/ˈfɑːməsi/', vi: 'nhà thuốc' },
  'plaster':        { w: 'plaster', ipa: '/ˈplɑːstə/', vi: 'bó bột (khi gãy xương)' },
  'bandage':        { w: 'bandage', ipa: '/ˈbændɪdʒ/', vi: 'băng (vải quấn vết thương)' },
  'vaccination':    { w: 'vaccination', ipa: '/ˌvæksɪˈneɪʃn/', vi: 'sự tiêm phòng' },
  'scales':         { w: 'scales', ipa: '/skeɪlz/', vi: 'cái cân' },
  'symptoms':       { w: 'symptoms', ipa: '/ˈsɪmptəmz/', vi: 'triệu chứng (bệnh)' },
  'treatments':     { w: 'treatments', ipa: '/ˈtriːtmənts/', vi: 'cách điều trị' },
  'undercooked':    { w: 'undercooked', ipa: '/ˌʌndəˈkʊkt/', vi: 'chưa nấu chín kỹ' },
  'recovering':     { w: 'recovering', ipa: '/rɪˈkʌvərɪŋ/', vi: 'đang hồi phục (sau ốm)' },
  'cough':          { w: 'cough', ipa: '/kɒf/', vi: 'cơn ho, ho' },
  'ward':           { w: 'ward', ipa: '/wɔːd/', vi: 'khu / phòng bệnh (trong bệnh viện)' },
  'operating theatres': { w: 'operating theatres', ipa: '/ˈɒpəreɪtɪŋ ˌθɪətəz/', vi: 'phòng mổ' },
  'accommodation':  { w: 'accommodation', ipa: '/əˌkɒməˈdeɪʃn/', vi: 'chỗ ở' },
  'twist ankle':    { w: 'twist your ankle', ipa: '/ˌtwɪst jɔːr ˈæŋkl/', vi: 'trẹo mắt cá chân' },
  'compensate':     { w: 'compensate', ipa: '/ˈkɒmpenseɪt/', vi: 'bù đắp' },
  'substantial':    { w: 'substantial', ipa: '/səbˈstænʃl/', vi: 'nhiều, đáng kể' },
  'diet':           { w: 'diet', ipa: '/ˈdaɪət/', vi: 'chế độ ăn' },
  'balanced diet':  { w: 'balanced diet', ipa: '/ˌbælənst ˈdaɪət/', vi: 'chế độ ăn cân bằng' },
  'stress':         { w: 'stress', ipa: '/stres/', vi: 'căng thẳng' },
  'demanding':      { w: 'demanding', ipa: '/dɪˈmɑːndɪŋ/', vi: 'đòi hỏi nhiều, vất vả' },
  'consequently':   { w: 'consequently', ipa: '/ˈkɒnsɪkwəntli/', vi: 'vì vậy, do đó' },
  'escalators':     { w: 'escalators', ipa: '/ˈeskəleɪtəz/', vi: 'thang cuốn' },
  'muscles':        { w: 'muscles', ipa: '/ˈmʌslz/', vi: 'cơ bắp' },
  'cut down on':    { w: 'cut down on', ipa: '/ˌkʌt ˈdaʊn ɒn/', vi: 'cắt giảm (ăn / dùng ít hơn)' },
  'put on weight':  { w: 'put on weight', ipa: '/ˌpʊt ɒn ˈweɪt/', vi: 'tăng cân' },
  'come down with': { w: 'come down with', ipa: '/ˌkʌm ˈdaʊn wɪð/', vi: 'bị (ốm nhẹ, cảm…)' },
  'take up':        { w: 'take up', ipa: '/ˌteɪk ˈʌp/', vi: 'bắt đầu chơi / học (môn thể thao, sở thích)' },
  'keep to':        { w: 'keep to', ipa: '/ˈkiːp tuː/', vi: 'giữ đúng, tuân theo' },
  'live on':        { w: 'live on', ipa: '/ˈlɪv ɒn/', vi: 'chỉ ăn (một loại thức ăn) để sống' },
  'get round to':   { w: 'get round to', ipa: '/ˌɡet ˈraʊnd tuː/', vi: 'cuối cùng cũng làm (việc định làm)' },
  'go for':         { w: 'go for', ipa: '/ˈɡəʊ fɔː/', vi: 'đi (dạo / chạy…); chọn' },
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
  }, {
  /* ===================== TUẦN 1 · bài 2 – Vocabulary Unit 25 ===================== */
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

  /* ===================== TUẦN 2 – Grammar Unit 2 ===================== */
  2: [{
    kind: 'Grammar', icon: '📘', code: 'Unit 2', title: 'Past tenses',
    copy: false,
    newWords: ['coach', 'revision', 'queue', 'autograph', 'embarrass', 'diary', 'application form', 'receptionist', 'crash pc',
      'depressed', 'pay rise', 'independent', 'ground floor', 'thieves', 'break into', 'tune', 'hit songs', 'ancient', 'amazed'],
    // Ô Grammar đặt SAU 2 bài nghe mở đầu (grammarAfter: 2). Ví dụ KHÔNG trùng câu trong bài tập.
    grammarAfter: 2,
    grammar: `
      <h4>1. Quá khứ đơn (Past simple)</h4>
      <p class="fml">(+) V-ed / V2 &nbsp;·&nbsp; (−) didn’t + V &nbsp;·&nbsp; (?) Did … + V?</p>
      <ul>
        <li>Việc đã xong trong quá khứ: <i>We <b>visited</b> Da Nang last summer.</i></li>
        <li>Chuỗi việc xảy ra nối tiếp: <i>She <b>opened</b> the door, <b>looked</b> around and <b>smiled</b>.</i></li>
        <li>Tình huống lâu dài / việc lặp lại trong quá khứ: <i>He <b>lived</b> in Hue for ten years.</i></li>
      </ul>
      <h4>2. Quá khứ tiếp diễn (Past continuous)</h4>
      <p class="fml">(+) was / were + V-ing &nbsp;·&nbsp; (−) wasn’t / weren’t + V-ing &nbsp;·&nbsp; (?) Was / Were … + V-ing?</p>
      <ul>
        <li>Việc đang diễn ra thì có việc khác xen vào (<i>when / while</i>): <i>I <b>was cooking</b> when the lights <b>went</b> out.</i></li>
        <li>Hai việc diễn ra cùng lúc: <i>Mum <b>was reading</b> while Dad <b>was watching</b> TV.</i></li>
        <li><b>always</b> + V-ing = phàn nàn: <i>My little brother <b>was always taking</b> my pens!</i></li>
        <li>Dự định không thành (<i>plan, hope, think of</i>): <i>We <b>were planning</b> a picnic, but it rained.</i></li>
        <li>⚠ Động từ trạng thái (<i>know, want, like, believe…</i>) không dùng -ing: <i>I <b>knew</b> the answer.</i> (không nói <s>was knowing</s>)</li>
      </ul>
      <h4>3. used to / would + V: thói quen trong quá khứ, bây giờ KHÔNG còn</h4>
      <p class="fml">(+) used to + V &nbsp;·&nbsp; (−) didn’t use to + V &nbsp;·&nbsp; (?) Did … use to + V?</p>
      <ul>
        <li><i>I <b>used to play</b> football every afternoon.</i> (bây giờ không chơi nữa)</li>
        <li><b>would</b> + V chỉ dùng cho <b>hành động</b> lặp lại: <i>On Sundays, Grandpa <b>would take</b> us fishing.</i></li>
        <li>Trạng thái (<i>be, have, like…</i>) chỉ dùng <b>used to</b>: <i>She <b>used to have</b> long hair.</i> (không nói <s>would have</s>)</li>
      </ul>
      <h4>4. be / get used to + V-ing / danh từ (khác với used to + V!)</h4>
      <ul>
        <li><b>be used to</b> = đã quen: <i>I<b>’m used to</b> getting up early.</i></li>
        <li><b>get used to</b> = dần dần quen: <i>You’ll soon <b>get used to</b> the noise.</i></li>
        <li>Dùng được ở mọi thì: <i>is used to · was used to · will get used to · got used to…</i></li>
        <li>So sánh: <i>I <b>used to live</b> in Hanoi.</i> (trước đây sống, giờ không) ≠ <i>I<b>’m used to living</b> in Hanoi.</i> (đã quen sống ở đó)</li>
      </ul>`,
    ex: [
      /* Bài 1 (Context listening 1, không có bước đoán) – ai đã làm việc gì */
      { id: 'l1', type: 'list', track: 'u2-listening',
        title: 'Listening: Jack’s day in London',
        how: 'Listen to Jack talking to his grandmother. Who did these things? Choose J (Jack), M (Jack’s mother) or G (Gran).',
        examples: [ 'go to London ((*J/M/G))' ],
        items: [
          { t: 'see a famous footballer ((*J/M/G))', h: 'Nghe đoạn xếp hàng mua vé xem phim.' },
          { t: 'go up to town alone ((J/M/*G))', h: 'Nghe đoạn bà kể chuyện ngày xưa: “When I was your age…”.' },
          { t: '{{worry}} about school work ((J/*M/G))', h: 'Nghe câu cuối của bà: “But don’t tell your mother…”.' },
          { t: 'go to a club ((*J/M/G))', h: 'Nghe câu cuối của Jack, sau khi xem phim.' },
        ] },

      /* Bài 2 (Context listening 4) – nghe lại, điền đúng từ người nói dùng */
      { id: 'l4', type: 'list', track: 'u2-listening',
        title: 'Listen again: complete the sentences',
        how: 'Listen again and complete the sentences with the words that the speakers use.',
        items: [
          { t: 'We did some {{revision}} for our exams while we [[were travelling|were traveling]].', h: 'Một việc kéo dài (đi đường) đang diễn ra trong lúc làm việc khác.' },
          { t: 'When we [[were queuing|were queueing]] for the cinema, we saw a really famous footballer.', h: 'Việc đang diễn ra thì gặp cầu thủ (việc xen vào). Động từ: queue.' },
          { t: 'He [[was buying]] a burger and all the crowds [[were walking]] past but nobody noticed him except me.',
            h: ['Hai việc diễn ra cùng lúc. Chủ ngữ “he”.', 'Hai việc diễn ra cùng lúc. Chủ ngữ “the crowds” số nhiều.'] },
        ] },

      /* Bài 3 (Grammar ex 2) – quá khứ đơn / quá khứ tiếp diễn */
      { id: 'g2', type: 'list',
        title: 'Past simple or past continuous?',
        how: 'Fill in the gaps with the past simple or past continuous form of the verbs in brackets.',
        examples: [ 'My parents [[got]] (get) to know each other when they [[were studying]] (study) at university.' ],
        items: [
          { t: 'Doctor Fisher [[travelled|traveled]] (travel) widely as a young man and [[always kept]] (always keep) a {{diary}}.',
            h: ['Việc đã xong trong quá khứ (khi còn trẻ).', 'Thói quen trong quá khứ, không phải phàn nàn. Nhớ vị trí của “always”.'] },
          { t: 'I [[saw]] (see) my brother and his friend when I [[was waiting]] (wait) for the bus, but they [[didn’t see|did not see]] (not see) me.',
            h: ['Việc ngắn xen vào.', 'Việc đang diễn ra thì có việc khác xen vào.', 'Câu phủ định của việc ngắn.'] },
          { t: 'Lily [[filled]] (fill) in the {{application form}} and [[gave]] (give) it to the {{receptionist}}.',
            h: ['Chuỗi việc nối tiếp nhau.', 'Việc tiếp theo trong chuỗi; động từ bất quy tắc.'] },
          { t: 'While I [[was working]] (work) in Rome, I [[met]] (meet) a girl who [[looked]] (look) just like your sister.',
            h: ['“While” + việc kéo dài.', 'Việc ngắn xen vào; động từ bất quy tắc.', '“look like” (trông giống) là động từ trạng thái.'] },
          { t: 'Simon [[bought]] (buy) a new laptop because his old one [[was always crashing]] (always crash).',
            h: ['Việc đã xong; động từ bất quy tắc.', '“always” + ý phàn nàn: xem mục 2 trong ô Grammar.'] },
          { t: 'I [[missed]] (miss) your text because my phone [[was charging]] (charge) in another room.',
            h: ['Việc đã xong.', 'Việc đang diễn ra lúc tin nhắn đến.'] },
          { t: 'Anna’s feeling {{depressed}} because she [[was hoping]] (hope) for a {{pay rise}} last week, but she [[didn’t get|did not get]] (not get) one.',
            h: ['Mong đợi nhưng không thành: xem mục 2 trong ô Grammar.', 'Câu phủ định, việc đã xong.'] },
        ] },

      /* Bài 4 (Grammar ex 3) – chọn dạng đúng trong đoạn văn */
      { id: 'g3', type: 'text',
        title: 'My granny',
        how: 'Choose the correct form of the verbs in this text.',
        paras: [
          { t: 'My granny is 93 and she’s come to live with us at our house. We’re all pleased because we love having her near us. She’s a very {{independent}} person and until this year, she <span class="exv">refused</span> to move to the flat on our {{ground floor}}. But last month she suddenly ((*changed/was changing)) her mind and I ((*asked/would ask)) her why. She explained that for years, nobody in her village ((*would lock/was locking)) their front doors and the place ((*used to feel/would feel)) safe, but last month she ((*met/was meeting)) a neighbour in the street when she ((*was walking/would walk)) home from the shops and ((*heard/was hearing)) some bad news. {{thieves|Thieves}} ((*were breaking/got used to breaking)) into people’s houses while they ((*were sitting/would sit)) in their back gardens.',
            h: ['Một việc ngắn, đã xong (last month).', 'Việc ngắn, đã xong.', 'Thói quen nhiều năm trước, giờ không còn: “would” + hành động.', '“feel safe” là trạng thái: would không dùng được.', 'Việc ngắn xen vào.', 'Việc đang diễn ra thì gặp hàng xóm.', 'Việc ngắn, nối tiếp.', 'Việc đang diễn ra lúc đó (không phải “quen dần”).', 'Hai việc diễn ra cùng lúc.'] },
          { t: 'She ((*realised/was realising)) that she ((wasn’t wanting/*didn’t want)) to live alone any more. She ((*isn’t used/didn’t use)) to being in the town yet, but it’s not as difficult as she ((was thinking/*thought)) it might be, and she loves seeing us more often.',
            h: ['“realise” là động từ trạng thái.', '“want” là động từ trạng thái.', 'Sau đó là “to being” (V-ing): be used to = quen với. Hiện tại (yet).', '“think” = cho rằng (ý kiến) → không dùng -ing.'] },
        ] },

      /* Bài 5 (Grammar ex 4 → dịch Việt – Anh, có gợi ý cụm từ khó) */
      { id: 'tr4', type: 'list', trans: true,
        title: 'Translate: be / get used to',
        how: 'Translate the sentences into English. Use be used to or get used to + -ing or a noun. The 💬 phrases will help you.',
        tip: 'Dịch cả câu sang tiếng Anh. Dùng <b>be used to</b> (đã quen) hoặc <b>get used to</b> (dần quen) + V-ing hoặc danh từ.',
        examples: [ '<div class="tvi">Sáng nay Rita rất mệt. Cô ấy không quen đi ngủ muộn.</div><span class="exv">Rita’s very tired this morning. She isn’t used to going to bed late.</span>' ],
        items: [
          { vi: 'Đừng lo cho bọn trẻ: chúng đã quen đi học bằng xe buýt rồi.', ph: '<i>đi học bằng xe buýt</i> = go to school by bus',
            t: '[[Don’t worry about the children: they’re used to going to school by bus.|Don’t worry about the children: they’re already used to going to school by bus.|Don’t worry about the kids: they’re used to going to school by bus.|Don’t worry about the children: they’ve got used to going to school by bus.|Don’t worry about the children: they’re used to taking the bus to school.]]',
            h: '“đã quen” = be used to + V-ing. Chủ ngữ “they”.' },
          { vi: 'Sếp mới của tôi quen ra lệnh chứ không quen nhận lệnh.', ph: '<i>ra lệnh</i> = give orders · <i>nhận lệnh</i> = receive orders',
            t: '[[My new boss is used to giving orders, not receiving them.|My new boss is used to giving orders, not receiving orders.|My new boss is used to giving orders, not to receiving them.|My new boss is used to giving orders, but not receiving them.|My new boss is used to giving orders and not receiving them.|My new boss is used to giving orders, not taking them.]]',
            h: 'be used to + V-ing (give → giving). Chủ ngữ số ít.' },
          { vi: 'Cô ấy không quen uống cà phê rất đặc và nó đã làm cô ấy bị ốm.', ph: '<i>cà phê rất đặc</i> = very strong coffee · <i>làm ai bị ốm</i> = make somebody ill',
            t: '[[She wasn’t used to drinking very strong coffee and it made her ill.|She wasn’t used to drinking very strong coffee, so it made her ill.|She wasn’t used to drinking very strong coffee and it made her sick.|She wasn’t used to drinking very strong coffee, so she got ill.|She wasn’t used to drinking very strong coffee and she got ill.|She wasn’t used to drinking very strong coffee and she became ill.]]',
            h: 'Chuyện đã xảy ra → be ở quá khứ. Câu phủ định + V-ing.' },
          { vi: 'Bạn đã quen với khí hậu của chúng tôi chưa, hay bạn vẫn nhớ ánh nắng?', ph: '<i>khí hậu</i> = climate · <i>nhớ ánh nắng</i> = miss the sunshine',
            t: '[[Are you getting used to our climate or do you still miss the sunshine?|Have you got used to our climate or do you still miss the sunshine?|Have you gotten used to our climate or do you still miss the sunshine?|Are you used to our climate or do you still miss the sunshine?|Have you got used to our climate yet or do you still miss the sunshine?|Are you used to our climate yet or do you still miss the sunshine?|Are you getting used to our climate or do you still miss the sun?|Have you got used to our climate or do you still miss the sun?]]',
            h: 'Câu hỏi: đưa trợ động từ lên trước “you”. get used to + danh từ (our climate).' },
          { vi: 'Trước đây tôi chưa bao giờ ở một khách sạn đắt tiền như thế, nhưng tôi đã nhanh chóng quen với nó.', ph: '<i>một khách sạn đắt tiền như thế</i> = such an expensive hotel · <i>nhanh chóng</i> = soon / quickly',
            t: '[[I had never stayed in such an expensive hotel before, but I soon got used to it.|I’d never stayed in such an expensive hotel before, but I soon got used to it.|I had never stayed in such an expensive hotel before, but I quickly got used to it.|I’d never stayed in such an expensive hotel before, but I quickly got used to it.|I never stayed in such an expensive hotel before, but I soon got used to it.|I had never stayed in a hotel as expensive as that before, but I soon got used to it.]]',
            h: '“dần quen” ở quá khứ = got used to + it.' },
        ] },

      /* Bài 6 – Exam practice: Reading and Use of English Part 1 */
      { id: 'rue1', type: 'text', part: 'Exam practice',
        title: 'Reading and Use of English Part 1: A musician is discovered',
        how: 'Read the text and choose the answer (A, B, C or D) which best fits each gap. There is an example at the beginning (0).',
        tip: 'If you are unsure, first cross out the answers that are wrong.',
        paras: [
          { t: 'When Jimmy Yates was a small boy, his family <span class="exv">spent</span> their holidays on his grandfather’s farm. This was in a valley ((*surrounded/closed/held/circled)) by mountains. It was during one of these visits that Jimmy’s ((talent/gift/*ability/skill)) to remember a {{tune}} led to the suggestion that the boy should ((*take up/start up/pick up/join up)) a musical instrument.',
            h: ['Thung lũng được núi … (bao quanh).', 'Danh từ đi với “to + V”: khả năng làm gì.', 'Bắt đầu học (một nhạc cụ, một môn thể thao).'] },
          { t: 'One evening a discussion ((happened/came/entered/*arose)) among the adults about the differences between two {{hit songs}}. His father tried to prove the ((comparison/closeness/likeness/*similarity)) of the two tunes by playing them, not very well, on his guitar. No one thought that Jimmy, who was only five, was listening, but suddenly he made his ((path/*way/route/line)) to the {{ancient}} piano which stood in the corner and played first one of the tunes and then the other. The family was {{amazed}} ((so/although/when/*as)) no one had heard him play any music before. In this way, Jimmy’s musical ((work/living/*career/study)) began.',
            h: ['Một cuộc tranh luận … (nảy sinh). Động từ đi với “discussion / problem”.', 'Bố muốn chứng minh hai bài giống nhau ở điểm nào.', 'make one’s … to = đi tới đâu.', 'Liên từ chỉ lý do (= because).', 'Con đường nghề nghiệp lâu dài.'] },
        ] },

      /* Bài 7 – Grammar focus task: động từ bất quy tắc */
      { id: 'gft', type: 'list',
        title: 'Grammar focus: irregular past forms',
        how: 'Write the past simple form of these verbs from the exam text.',
        examples: [ 'begin → [[began]]' ],
        items: [
          { t: 'arise → [[arose]]' }, { t: 'come → [[came]]' }, { t: 'go → [[went]]' }, { t: 'hear → [[heard]]' },
          { t: 'hold → [[held]]' }, { t: 'lead → [[led]]' }, { t: 'make → [[made]]' }, { t: 'spend → [[spent]]' },
          { t: 'stand → [[stood]]' }, { t: 'take → [[took]]' }, { t: 'think → [[thought]]' },
        ].map(x => Object.assign(x, { h: 'Động từ bất quy tắc: xem cột 2 trong bảng động từ bất quy tắc.' })) },
    ],
  }, {
  /* ===================== TUẦN 2 · bài 2 – Vocabulary Unit 26 ===================== */
    kind: 'Vocabulary', icon: '🥗', code: 'Unit 26', title: 'Living a healthy life',
    // chép vở: 14 từ chính + 6 từ là đáp án (hiện sau khi nộp) = 20 từ
    newWords: ['vitamins', 'protein', 'fibre', 'carbohydrate', 'calories', 'lean meat', 'dairy products', 'junk food', 'immune system',
      'blister', 'sore throat', 'stomach upset', 'run down', 'jet-lagged'],
    newWordsAfter: ['cut down on', 'put on weight', 'come down with', 'take up', 'prescription', 'stitches'],
    ex: [
      /* Bài 1 (1.1) – hai bữa ăn: nhiều / ít chất gì */
      { id: 'h11', type: 'list', img: 'u26-meals.jpg',
        title: 'Healthy or unhealthy?',
        how: 'Look at the two meals. Is each meal high or low in these things?',
        examples: [ 'salt: Meal A ((*high/low)) · Meal B ((high/*low))' ],
        items: [
          { t: 'fat: Meal A ((*high/low)) · Meal B ((high/*low))', h: ['Burger + bánh kem: nhiều mỡ.', 'Cá + rau + cam: ít mỡ.'] },
          { t: 'sugar: Meal A ((*high/low)) · Meal B ((high/*low))', h: ['Nước ngọt + bánh kem.', 'Bữa B không có đồ ngọt.'] },
          { t: '{{vitamins}}: Meal A ((high/*low)) · Meal B ((*high/low))', h: ['Bữa A có rau quả không?', 'Cam, rau, nước ép.'] },
          { t: '{{fibre}}: Meal A ((high/*low)) · Meal B ((*high/low))', h: ['Chất xơ có nhiều trong rau, quả.', 'Rau, cam: nhiều chất xơ.'] },
          { t: '{{protein}}: Meal A ((*high/low)) · Meal B ((*high/low))', h: ['Thịt trong burger là chất đạm.', 'Cá cũng là chất đạm.'] },
          { t: '{{carbohydrate}}: Meal A ((*high/low))', h: 'Bánh mì burger + bánh ngọt: nhiều tinh bột.' },
          { t: '{{calories}}: Meal A ((*high/low))', h: 'Đồ ăn nhanh, đồ ngọt: rất nhiều năng lượng.' },
        ] },

      /* Bài 2 (1.2) – nghe: anh ấy có nhắc tới không (bỏ “eating substantial portions”: sách và bài nghe lệch nhau) */
      { id: 'h12', type: 'list', track: 'u26-sportsman',
        title: 'Listening: a sportsman’s lifestyle',
        how: 'Listen to a sportsman talking about his lifestyle. Does he mention these things?',
        items: [
          { t: 'going on a {{diet}} ((Yes/*No))', h: 'Anh ấy nói về chế độ ăn cân bằng, nhưng có nói đang ăn kiêng để giảm cân không?' },
          { t: 'eating {{lean meat}} ((*Yes/No))', h: 'Nghe câu đầu: “I consume a lot of protein, especially fish and…”.' },
          { t: 'needing {{carbohydrate}} for energy ((*Yes/No))', h: 'Nghe đoạn nói về pasta và khoai tây.' },
          { t: 'not putting on weight ((*Yes/No))', h: 'Nghe đoạn nói về khẩu phần ăn lớn.' },
          { t: 'cutting out fat ((Yes/*No))', h: 'Anh ấy cắt giảm muối, nhưng có nói bỏ hẳn chất béo không?' },
          { t: 'doing regular training ((*Yes/No))', h: 'Nghe đoạn “two evenings a week with my local team”.' },
          { t: 'drinking coffee ((Yes/*No))', h: 'Anh ấy chỉ nói về một loại đồ uống, uống rất nhiều.' },
          { t: 'getting enough sleep ((*Yes/No))', h: 'Nghe đoạn “eight hours…”.' },
          { t: 'handling {{stress}} ((*Yes/No))', h: 'Nghe câu cuối cùng.' },
        ] },

      /* Bài 3 (1.3) – nghe lại: đúng / sai */
      { id: 'h13', type: 'list', track: 'u26-sportsman',
        title: 'Listen again: true or false?',
        how: 'Listen again. What would the sportsman say to these statements? True or false?',
        examples: [ 'I eat lots of fruit and vegetables. ((*True/False))' ],
        items: [
          { t: 'I’ve stopped eating {{dairy products}}. ((True/*False))', h: 'Anh ấy nói gì về sữa và phô mai?' },
          { t: 'I’ve {{cut down on}} chocolate. ((*True/False))', h: 'Nghe đoạn “I can’t resist chocolate either…”.' },
          { t: 'I occasionally eat {{junk food}}. ((True/*False))', h: 'Anh ấy “avoid” đồ ăn nhanh.' },
          { t: 'I go to the gym regularly. ((*True/False))', h: 'Nghe đoạn “three times a week”.' },
          { t: 'I’ve recently given up smoking. ((True/*False))', h: 'Anh ấy đã từng hút thuốc chưa?' },
          { t: 'I drink lots of water. ((*True/False))', h: 'Nghe đoạn “a huge amount of…”.' },
          { t: 'I don’t get much sleep at the weekend. ((True/*False))', h: 'Anh ấy cố ngủ bao nhiêu tiếng mỗi đêm?' },
        ] },

      /* Bài 4 (1.5) – phrasal verbs (phải chia dạng → gõ, khung từ bên cạnh) */
      { id: 'h15', type: 'text', side: true,
        title: 'Phrasal verbs: stay healthy',
        how: 'Complete the paragraph with the correct form of the phrasal verbs in the box.',
        box: ['come down with', 'cut down on', 'get round to', 'go for', '~keep to', 'live on', 'put on', 'take up'],
        paras: [
          { t: 'If you want to stay healthy, you need to <span class="exv">keep to</span> a healthy diet. Eat plenty of fruit, vegetables and salad and [[cut down on]] salt, fat and processed sugar. And if you want to avoid [[putting on]] weight, it’s definitely best not to [[live on]] {{junk food}}, because it contains all those things. Also, whatever your age, it’s important to [[get round to]] doing exercise on a regular basis, so think about [[taking up]] a sport, or [[going for]] a regular walk or run. By doing all these things, you should build up a healthy {{immune system}} and avoid [[coming down with]] colds all the time.',
            h: ['Ăn / dùng ít đi.', 'Sau “avoid” động từ thêm -ing; “tăng” cân.', 'Chỉ ăn một loại thức ăn mãi.', 'Cuối cùng cũng chịu làm.', 'Sau “think about” thêm -ing; bắt đầu chơi một môn.', 'Sau “or” vẫn là -ing (song song với ý trước); đi dạo / chạy.', 'Sau “avoid” thêm -ing; bị cảm.'] },
        ] },

      /* Bài 5 (2.1) – nối bệnh nhẹ với nguyên nhân (kéo thả A–F) */
      { id: 'h21', type: 'list', drag: true,
        title: 'Minor medical problems',
        how: 'Match the minor medical problems with the possible causes (A–F).',
        sents: ['You’re just {{recovering}} from flu.', 'You’ve had a bad {{cough}}.', 'You’ve eaten some {{undercooked}} meat.', 'You’ve just done a long flight.', 'You’re getting a cold.', 'You’ve been wearing new shoes.'],
        examples: [ 'get a {{blister}} → [[F]]' ],
        items: [
          { t: 'have a {{stomach upset}} [[C]]', h: 'Đau bụng thường do ăn phải gì?' },
          { t: 'have a {{sore throat}} [[E]]', h: 'Đau họng hay là dấu hiệu sắp bị gì?' },
          { t: 'feel {{run down}} [[A]]', h: 'Mệt mỏi, yếu sau một trận ốm.' },
          { t: 'lose your voice [[B]]', h: 'Mất giọng sau khi ho nhiều.' },
          { t: 'be {{jet-lagged}} [[D]]', h: 'Lệch múi giờ sau khi làm gì?' },
        ] },

      /* Bài 6 (2.2) – chọn từ đúng */
      { id: 'h22', type: 'list',
        title: 'At the doctor’s',
        how: 'Choose the correct words in these sentences.',
        tip: '<b>prescription</b> = paper from the doctor for your medicine · <b>receipt</b> = paper that shows you have paid · <b>recipe</b> = instructions for cooking.',
        examples: [ 'If you have burnt yourself badly, you go to the ((*{{casualty department}}/local surgery)).' ],
        items: [
          { t: 'If you cut your hand and need ((scars/*stitches)), the doctor will give you a local {{anaesthetic}}.', h: 'Khâu vết cắt lại, không phải vết sẹo.' },
          { t: 'If you suffer from {{hay fever}}, the doctor will give you ((*antihistamines/antibiotics)).', h: 'Dị ứng phấn hoa → thuốc chống dị ứng.' },
          { t: 'If you need medicine, the doctor will give you a ((recipe/*prescription)) to take to the local {{pharmacy}}.', h: 'Xem mẹo bên trên: giấy bác sĩ kê thuốc.' },
          { t: 'If you break your leg, the doctor will put it in ((*plaster/bandage)) as soon as possible.', h: 'Gãy chân thì phải bó cứng lại.' },
          { t: 'When travelling to some countries, you might need a ((protection/*vaccination)) for a disease like yellow fever.', h: 'Tiêm để phòng bệnh trước khi đi.' },
          { t: 'If you need weighing, the nurse will ask you to step on the ((weights/*scales)).', h: 'Dụng cụ để đứng lên cân.' },
          { t: 'If the ((*symptoms/treatments)) of your illness are obvious, it is easy for your doctor to decide what’s wrong.', h: 'Dấu hiệu của bệnh, giúp bác sĩ đoán bệnh.' },
        ] },

      /* Bài 7 (3.1) – phrasal verbs với make (kéo thả nghĩa A–E) */
      { id: 'h31', type: 'list', drag: true,
        title: 'Phrasal verbs with “make”',
        how: 'Match each sentence with its meaning (A–E). The phrasal verbs are in bold.',
        sents: ['Someone did something good to {{compensate}} for something they hadn’t done before.', 'Someone headed in a particular direction.', 'Someone decided to use something in a different way.', 'Someone invented a reason for something which happened to them.', 'Someone was unable to understand what another person was saying.'],
        examples: [ 'I didn’t want to play hockey, so I <b>made up</b> a story about {{twist ankle|twisting my ankle}}. → [[D]]' ],
        items: [
          { t: 'She didn’t visit me when I was ill, but she <b>made up for</b> it by sending me some flowers. [[A]]', h: 'Làm việc tốt để bù lại.' },
          { t: 'Sophie didn’t know which {{ward}} her brother was on, so she <b>made for</b> the information desk. [[B]]', h: 'Đi về phía quầy thông tin.' },
          { t: 'The nurse spoke so softly that I couldn’t <b>make out</b> what she was saying about my medicine. [[E]]', h: 'Không nghe rõ, không hiểu được.' },
          { t: 'The old {{operating theatres}} are no longer used, so the hospital has <b>made</b> them <b>into</b> {{accommodation}} for nursing staff. [[C]]', h: 'Biến phòng mổ cũ thành chỗ ở.' },
        ] },

      /* Bài 8 – Exam practice: Reading and Use of English Part 2 (không lấy Writing) */
      { id: 'rue2', type: 'text', part: 'Exam practice',
        title: 'Reading and Use of English Part 2: The importance of physical activity',
        how: 'Read the text and think of the word which best fits each gap. Use only ONE word in each gap. There is an example at the beginning (0).',
        tip: 'Read the whole text first to get a general idea of what it is about.',
        paras: [
          { t: 'The pace <span class="exv">of</span> modern life is very fast, and most people have busy and {{demanding}} lives. {{consequently|Consequently}}, eating [[a]] {{balanced diet|balanced diet}} and doing physical activity make a big difference to overall health. [[Although|Though|While]] we are all aware of how important exercise is for us, from our brains to our bones, many people spend far [[too]] little time exercising. The good news is that [[it]] is easier than you think to fit physical activity [[into]] your day because you can do it at [[any]] time and wherever suits you.',
            h: ['Mạo từ trước “balanced diet”.', 'Liên từ: “Mặc dù… nhưng…”.', '“far … little” = quá ít.', 'Chủ ngữ giả cho “is easier than you think to…”.', 'fit something … your day = sắp xếp vào.', '“at … time” = bất cứ lúc nào.'] },
          { t: 'Remember that your feet were made for walking, so use them [[whenever|when|if]] you get the chance. Walk around town, ignore lifts and {{escalators}}, and build up your leg {{muscles}} by climbing stairs. Next, get out and have fun. For example, kicking a ball about is a great way to spend time together [[as]] a family, or with friends.',
            h: ['“… you get the chance” = mỗi khi có cơ hội.', 'together … a family = cùng nhau như một gia đình.'] },
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
  { id: 'boss1', after: 4, name: 'Tense Titan', img: 'boss-1', fx: 'b1', arena: 'arena-1', units: 'Unit 1 · Unit 2 · Unit 25',
    qs: [
      { p: 1, t: 'From the top of the hill we had a breathtaking ((*view/sight/look/scene)) of the whole valley.', h: 'have a … of something = nhìn thấy toàn cảnh.' },
      { p: 1, t: 'The path to the waterfall was very ((*steep/high/tall/sharp)), so we walked slowly.', h: 'Đường dốc đứng, khó đi lên.' },
      { p: 1, t: 'We stopped next to a small ((*stream/wave/tide/current)) to fill our water bottles.', h: 'Dòng nước nhỏ chảy trên núi.' },
      { p: 1, t: 'In the evening a thick ((*fog/smoke/steam/dust)) came down and we could hardly see the road.', h: 'Hiện tượng thời tiết làm khó nhìn thấy đường.' },
      { p: 2, t: 'Hi Sam! I [[am]] writing to you from a campsite in the mountains.', h: 'Việc đang làm ngay lúc viết thư.' },
      { p: 2, t: 'We [[are]] staying here until Sunday, and then we drive home.', h: 'Kế hoạch / việc tạm thời: hiện tại tiếp diễn.' },
      { p: 2, t: 'Every morning we get up early, but today it is raining, so we [[are|\'re]] playing cards in the tent.', h: 'Việc đang diễn ra lúc này.' },
      { p: 2, t: 'What [[do]] you usually do at the weekend?', h: 'Câu hỏi về thói quen: hiện tại đơn.' },
      { p: 2, t: 'When I was younger, I [[used]] to spend every summer on my uncle’s farm.', h: 'Thói quen trong quá khứ, bây giờ không còn: … to + V.' },
      { p: 2, t: 'We [[were]] watching a film when the power suddenly went off.', h: 'Việc đang diễn ra thì bị xen vào. Chủ ngữ “we”.' },
      { p: 2, t: 'It took me months to get used to [[living|being]] in such a big city.', h: 'get used to + V-ing.' },
      { p: 2, t: '[[Did]] you use to play any sport at primary school?', h: 'Câu hỏi với used to: trợ động từ ở quá khứ.' },
      { p: 3, base: 'ROCK', t: 'We climbed up a narrow [[rocky]] path to reach the top.', h: 'Cần tính từ đứng trước danh từ “path”.' },
      { p: 3, base: 'FOG', t: 'It was such a [[foggy]] morning that we couldn’t see the lake.', h: 'Tính từ chỉ thời tiết, đuôi giống “misty”.' },
      { p: 3, base: 'BREATH', t: 'The view from the summit was absolutely [[breathtaking]].', h: 'Tính từ ghép: đẹp đến “nín thở”.', ult: true },
      { p: 3, base: 'DANGER', t: 'Swimming in the river can be [[dangerous]] after heavy rain.', h: 'Cần tính từ sau “be”.' },
      { p: 4, first: 'There is a strange taste in this milk.', key: 'TASTES', t: 'This milk [[tastes strange|tastes a bit strange|tastes very strange]].', h: '“taste” là động từ trạng thái: dùng thì đơn.', ult: true },
      { p: 4, first: 'It annoys me that Tom arrives late so often.', key: 'ALWAYS', t: 'Tom [[is always arriving late|\'s always arriving late|is always coming late|\'s always coming late]], which annoys me.', h: '“always” + hiện tại tiếp diễn để phàn nàn.', ult: true },
      { p: 4, first: 'This bike belongs to my brother.', key: 'OWNS', t: 'My brother [[owns this bike]].', h: 'Động từ trạng thái chỉ sở hữu.', ult: true },
      { p: 4, first: 'What’s your opinion of the new teacher?', key: 'THINK', t: 'What [[do you think of|do you think about]] the new teacher?', h: '“think” = có ý kiến → thì đơn.', ult: true },
      { p: 4, first: 'I played the piano as a child, but I don’t play it any more.', key: 'USED', t: 'I [[used to play the piano|used to play piano]] as a child.', h: 'Thói quen trong quá khứ, bây giờ không còn: used to + V.', ult: true },
      { p: 4, first: 'Living in the countryside still feels strange to me.', key: 'USED', t: 'I [[am not used to living|’m not used to living|am still not used to living|’m still not used to living]] in the countryside.', h: 'be used to + V-ing = đã quen. Câu phủ định ở hiện tại.', ult: true },
      { p: 4, first: 'The phone rang in the middle of my shower.', key: 'HAVING', t: 'The phone rang while I [[was having a shower|was having my shower]].', h: 'Việc đang diễn ra thì bị xen vào: quá khứ tiếp diễn.', ult: true },
      { p: 4, first: 'Every evening my grandfather told us a story.', key: 'WOULD', t: 'My grandfather [[would tell us a story|would tell us stories]] every evening.', h: 'would + V = thói quen (hành động) trong quá khứ.', ult: true },
    ] },
];

/* =====================================================================
   SIDE QUEST – video cô tự làm (Google Drive, chia sẻ "Bất kỳ ai có đường liên kết").
   Mỗi quest là 1 bài như bài tuần (cùng cú pháp), thêm: id, week (mở khi OPEN_WEEK >= week),
   video = ID file Drive (phần giữa /d/…/view), mins = độ dài video.
   newWords = từ cần chép vở. Link riêng: ?sq=<id> (cô xem trước: &preview).
   ===================================================================== */
const SIDEQUESTS = [];

// Tuần đang mở = số lớn nhất giữa OPEN_WEEK_SET và các mục OPEN_DATES đã tới ngày (giờ VN) + đã có bài
const OPEN_WEEK = Object.keys(OPEN_DATES).reduce((w, k) => (+k > w && LESSONS[k] && Date.parse(OPEN_DATES[k] + 'T00:00:00+07:00') <= Date.now() ? +k : w), OPEN_WEEK_SET);
