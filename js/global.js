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

// Xử lý đóng/mở Dropdown bằng class .nav-dropdown
document.addEventListener('click', function(e) {
    // 1. Kiểm tra nếu người dùng bấm vào khối .nav-dropdown hoặc con của nó
    const dropdown = e.target.closest('.nav-dropdown');
    
    if (dropdown && window.innerWidth <= 768) {
        // Nếu bấm vào chính xác vùng chứa menu Courses
        e.preventDefault();
        e.stopPropagation(); // Ngăn menu bị đóng ngay lập tức
        dropdown.classList.toggle('is-open');
    } else {
        // 2. Nếu bấm ra ngoài .nav-dropdown, đóng menu con lại
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            d.classList.remove('is-open');
        });
    }
    
    // 3. Đóng Menu chính khi bấm ra ngoài Header
    const header = document.querySelector('.main-header');
    const nav = document.getElementById('mainNav');
    if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.querySelector('.mobile-toggle-btn i').className = 'fas fa-bars';
    }
});