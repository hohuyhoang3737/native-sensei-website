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

// HÀM MỚI: BẬT/TẮT VIDEO POPUP GIỚI THIỆU GIÁO VIÊN
function toggleVideo(videoId) {
    const videoOverlay = document.getElementById(videoId);
    const iframe = videoOverlay ? videoOverlay.querySelector('iframe') : null;

    if (!videoOverlay || !iframe) return;

    // Nếu đang hiện (display không phải 'none')
    if (videoOverlay.style.display === 'flex') {
        videoOverlay.style.display = 'none';
        // Dừng video bằng cách reset src
        const currentSrc = iframe.src.replace('?autoplay=1', '').replace('&autoplay=1', '');
        iframe.src = currentSrc;
    } else {
        // ĐÃ FIX: Chắc chắn set là 'flex' để khớp với CSS
        videoOverlay.style.display = 'flex'; 
        // Bật video và tự động phát
        let currentSrc = iframe.src;
        if (currentSrc.includes('?')) {
            iframe.src = currentSrc + '&autoplay=1'; 
        } else {
            iframe.src = currentSrc + '?autoplay=1'; 
        }
    }
}

