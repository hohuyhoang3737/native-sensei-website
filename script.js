function setLanguage(lang) {
    // 1. Đặt ngôn ngữ hiện tại của trang
    document.documentElement.lang = lang; 

    // 2. Cập nhật trạng thái active của nút ngôn ngữ
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const langButton = document.querySelector(`.lang-btn[data-lang-code="${lang}"]`);
    if (langButton) {
        langButton.classList.add('active');
    }

    // 3. Thay đổi nội dung của tất cả các phần tử có thuộc tính data-
    document.querySelectorAll('[data-ja], [data-en]').forEach(element => {
        let newContent;
        if (lang === 'ja') {
            newContent = element.getAttribute('data-ja');
        } else if (lang === 'en') {
            newContent = element.getAttribute('data-en');
        }

        // Cập nhật nội dung
        if (element.tagName === 'TITLE') {
            document.title = newContent;
        } else if (newContent) {
            element.innerHTML = newContent;
        }
    });

    // Lưu lựa chọn ngôn ngữ vào bộ nhớ trình duyệt để lần sau tải lại
    localStorage.setItem('selectedLang', lang);
}

// Tự động tải ngôn ngữ đã chọn khi trang được tải lần đầu
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'ja'; // Mặc định là Tiếng Nhật
    setLanguage(savedLang);
});
