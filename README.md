# B2 First Adventure 🚀

Trang bài tập về nhà tự học cho lớp B2 First (sách *Grammar and Vocabulary for First and First for Schools*). Mỗi tuần mở 1 bài, chỉ lấy các bài tập cô chỉ định.

Link cho học sinh: https://yumienglish.github.io/B2-First/

## Cấu trúc
- `index.html`: trang chủ (danh sách bài) và trang bài làm (`?w=1&b=1`, `?w=2&b=1`…). Hiện mỗi tuần 1 bài, xen kẽ Grammar / Vocabulary. Cô xem trước bài chưa mở: `?w=2&b=1&preview`
- `lessons.js`: **dữ liệu bài học**: `OPEN_WEEK`, `VOCAB` (từ mới: nghĩa, phiên âm), `LESSONS` (đề, đáp án, gợi ý, ô Grammar)
- `app.js`: giao diện, chấm điểm, làm lại câu sai, gửi bài
- `img/`: ảnh cắt từ sách, `img/meme/`: meme cảm xúc của cô sau lần nộp 1, `img/ai/`: hình minh hoạ tạo bằng ChatGPT (jpg, đã nén)
- `ai-images/PROMPTS.md`: prompt để cô tạo hình trong ChatGPT; ảnh gốc cô lưu vào `ai-images/` (không đưa lên git)
- `audio/`: audio đã cắt sẵn (bỏ phần giới thiệu Unit / số bài / đề bài, chỉ giữ từ đoạn nội dung đầu tiên)

## Cách viết câu hỏi trong `lessons.js`
- `((a/*b))`: chọn 1, dấu `*` là đáp án đúng
- `[[some]]`: ô gõ chữ (nhiều đáp án đúng thì ngăn bằng `|`)
- `{{từ}}` hoặc `{{khoá|chữ hiện}}`: từ mới, chạm vào thì hiện nghĩa và máy đọc to
- `h`: gợi ý khi làm lại câu sai (không ghi đáp án)
- Bài: `part` (tiêu đề phần), `stack` (lựa chọn dài xếp dọc), `type: 'text'` (đoạn văn), `box` (khung từ, `~` = từ đã dùng ở ví dụ), `only`, `sents` (câu A–G cho Reading Part 6), `track`, `img`, `tip`, `drag` (kéo thả / chạm từ trong khung vào chỗ trống), `ai` (hình ChatGPT)
- Bài: `copy: false` = ô New words chỉ để học, không bắt chép; `newWordsAfter` = từ chính là đáp án, hiện sau khi nộp xong

## Mở bài tuần mới
1. Thêm `LESSONS[n]` và từ mới vào `VOCAB`.
2. Chép ảnh vào `img/`, audio đã cắt vào `audio/`.
3. Đổi `OPEN_WEEK = n`, tăng `?v=` trong `index.html`, rồi push.

## Nộp bài
Dùng chung máy chủ Code.gs với các trang BTVN (unit `B2 First`): lần 1 chấm và gửi mail ngay; học sinh làm lại câu sai (có gợi ý), nộp lần 2 → mail so sánh lần 1 / lần 2, thời gian làm bài và số lần rời trang.
