let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');

// Toggle menu
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Auto close menu when clicking link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Scroll event (optimized)
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // 1. Efek Transparan Header
            header.classList.toggle('scrolled', window.scrollY > 50);

            // 2. Logika Active Link yang lebih akurat
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Jika scroll sudah melewati 1/3 bagian section tersebut
                if (window.scrollY >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.classList.add("active");
                }
            });

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Typed.js
if (document.querySelector(".multiple-text")) {
    new Typed('.multiple-text', {
        strings: ['Data Analyst', 'Data Scientist', 'Web Developer', 'Data Engineer'],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1000,
        loop: true,
    });
}

// Contact Form Validation
document.querySelector('.contact form').addEventListener('submit', function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const email = this.querySelector('input[type="email"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            valid = false;
        } else {
            input.style.borderColor = 'var(--main-color)';
        }
    });

    if (!emailPattern.test(email.value.trim())) {
        email.style.borderColor = "red";
        valid = false;
    }

    if (valid) {
        alert('Pesan berhasil dikirim!');
        this.reset();
    }
});


// Scroll Reveal Animation (IntersectionObserver)


const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
}, {
    threshold: 0.2
});

revealElements.forEach(el => revealObserver.observe(el));

// Ambil elemen tombol
const themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () => {
    // 1. Tambah atau hapus class 'light-mode' pada tag <body>
    document.body.classList.toggle('light-mode');

    // 2. Ganti ikon bulan (bx-moon) jadi matahari (bx-sun) kalau lagi light-mode
    if (document.body.classList.contains('light-mode')) {
        themeBtn.classList.replace('bx-moon', 'bx-sun');
    } else {
        themeBtn.classList.replace('bx-sun', 'bx-moon');
    }
};
