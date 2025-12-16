document.addEventListener('DOMContentLoaded', function () {
    // Inisialisasi AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Pengalih Menu Seluler
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Tutup menu seluler saat tautan diklik
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Efek Header Lengket
    const header = document.querySelector('header');
    const scrollHandler = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    // Pemeriksaan awal
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);

    // Scroll Spy untuk Penyorotan Tautan Aktif
    const sections = document.querySelectorAll('section[id]');
    
    function activeMenu() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset untuk header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if(navLink) navLink.classList.add('active');
            }
        });

        // Kasus khusus untuk bagian atas halaman
        if (scrollY < 100) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if(homeLink) homeLink.classList.add('active');
        }
    }
    
    window.addEventListener('scroll', activeMenu);

    // Penangan Formulir Kontak
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulasikan pengiriman formulir
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Terima kasih! Pesan Anda telah kami terima. Kami akan segera menghubungi Anda.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
