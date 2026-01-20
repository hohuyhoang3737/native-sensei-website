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

// Xử lý đóng mở Dropdown Menu trên Mobile
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropbtn');
        
        btn.addEventListener('click', (e) => {
            // Nếu là mobile (width < 768) thì ngăn chuyển trang để mở menu
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('is-open');
            }
        });
    });

    // Đóng menu nếu bấm ra ngoài vùng menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('is-open'));
        }
    });
});

function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
    
    const icon = document.querySelector('.mobile-toggle-btn i');
    if (nav.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
}

function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
    
    const icon = document.querySelector('.mobile-toggle-btn i');
    if (nav.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
    
    const icon = document.querySelector('.mobile-toggle-btn i');
    if (nav.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

document.addEventListener('click', function(e) {
    const dropdown = e.target.closest('.nav-dropdown');
    const nav = document.getElementById('mainNav');
    const toggleBtn = document.querySelector('.mobile-toggle-btn');

    // 1. XỬ LÝ KHI BẤM VÀO MENU "COURSES" (NÚT CHA)
    // Kiểm tra nếu bấm vào dropbtn hoặc chính thẻ chứa dropdown nhưng KHÔNG phải link con
    if (dropdown && e.target.closest('.dropbtn') && window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('is-open');
        return; // Dừng lại ở đây, không chạy xuống logic đóng menu dưới
    }

    // 2. XỬ LÝ KHI CHỌN XONG MENU (Bấm vào các link <a>)
    // Nếu bấm vào một link <a> bất kỳ (trong menu chính hoặc menu con)
    if (e.target.tagName === 'A' && nav.contains(e.target)) {
        // Đóng menu chính
        nav.classList.remove('active');
        // Đóng luôn các dropdown con đang mở (nếu có)
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('is-open'));
        // Đổi lại icon về 3 gạch
        document.querySelector('.mobile-toggle-btn i').className = 'fas fa-bars';
        
        // Để trình duyệt tự chuyển trang (không dùng preventDefault ở đây)
    }

    // 3. ĐÓNG MENU KHI BẤM RA NGOÀI VÙNG HEADER
    const header = document.querySelector('.main-header');
    if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('is-open'));
        document.querySelector('.mobile-toggle-btn i').className = 'fas fa-bars';
    }
});