function setLanguage(lang) {
    // 1. Lưu ngôn ngữ đã chọn vào bộ nhớ trình duyệt (localStorage)
    // Việc này giúp khi bạn chuyển trang, trang mới sẽ biết bạn đang chọn ngôn ngữ nào
    localStorage.setItem('selectedLang', lang);

    // 2. Đặt thuộc tính lang cho thẻ html
    document.documentElement.lang = lang; 

    // 3. Cập nhật trạng thái hiển thị (nổi bật) của nút chọn ngôn ngữ
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        // Nếu mã ngôn ngữ của nút khớp với lang đang chọn thì thêm class active
        if (btn.getAttribute('data-lang-code') === lang) {
            btn.classList.add('active');
        }
    });

    // 4. Tìm và thay đổi nội dung của tất cả các phần tử có thuộc tính data-ja hoặc data-en
    document.querySelectorAll('[data-ja], [data-en]').forEach(element => {
        let newContent = (lang === 'ja') ? element.getAttribute('data-ja') : element.getAttribute('data-en');
        
        if (newContent) {
            // Nếu là thẻ tiêu đề trang (Title trên tab trình duyệt)
            if (element.tagName === 'TITLE') {
                document.title = newContent;
            } else {
                // Thay đổi nội dung hiển thị bên trong thẻ
                element.innerHTML = newContent;
            }
        }
    });
}

// Hàm này sẽ tự động chạy mỗi khi một trang web bất kỳ được tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem trước đó người dùng đã chọn ngôn ngữ nào chưa, nếu chưa thì mặc định là tiếng Nhật ('ja')
    const savedLang = localStorage.getItem('selectedLang') || 'ja';
    setLanguage(savedLang);
});
