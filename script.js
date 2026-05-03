// Global Selections
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');

// Navigation Logic
// Toggle menu
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Mencegah scroll pada halaman utama saat menu mobile sedang terbuka
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
};

// Auto close menu when clicking link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Visual Improvements
// Header Effect, Active Link, Show Scroll Top Button
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Efek Transparan Header
            header.classList.toggle('scrolled', window.scrollY > 50);

            // Active Link 
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Jika scroll sudah melewati 1/3 bagian section tersebut
                if (window.scrollY >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute("id");
                }
            });
            // Update active link berdasarkan section yang sedang dilihat
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.classList.add("active");
                }
            });
            // Show Scroll Top Button
            const scrollTop = document.querySelector('#scroll-top');
            if (window.scrollY > 400) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Theme Switcher Logic
const themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () => {
    // Toggle kelas 'light-mode' pada body untuk mengubah tema
    document.body.classList.toggle('light-mode');

    // Ganti ikon bulan (bx-moon) jadi matahari (bx-sun) saat light-mode
    if (document.body.classList.contains('light-mode')) {
        themeBtn.classList.replace('bx-moon', 'bx-sun');
    } else {
        themeBtn.classList.replace('bx-sun', 'bx-moon');
    }
};

// Interactive Components
// Logika Modal Services 
const serviceModal = document.getElementById("service-modal");
const serviceBtns = document.querySelectorAll(".btn-service");
const closeModal = document.querySelector(".close-modal");

// Fungsi membuka modal
serviceBtns.forEach(btn => {
    btn.onclick = () => {
        // Ambil data dari atribut tombol yang diklik
        const title = btn.getAttribute("data-title");
        const desc = btn.getAttribute("data-desc");
        const iconClass = btn.getAttribute("data-icon");

        // Masukkan data ke dalam elemen modal
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-desc").innerText = desc;
        document.getElementById("modal-icon").className = `bx ${iconClass}`;
        
        // Tampilkan modal
        serviceModal.style.display = "block";
        
        // Kunci scroll body agar tidak bergeser saat modal buka
        document.body.style.overflow = "hidden";
    };
});

// Fungsi menutup modal lewat tombol (X)
closeModal.onclick = () => {
    serviceModal.style.display = "none";
    document.body.style.overflow = "auto"; // Aktifkan scroll kembali
};

// Fungsi menutup modal jika klik di luar kotak putih (area hitam)
window.onclick = (event) => {
    if (event.target == serviceModal) {
        serviceModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

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

// Form Handling
// Contact Form Validation
document.querySelector('.contact form').addEventListener('submit', function (e) {

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

    if (!valid) {
        e.preventDefault();
        alert('Mohon lengkapi formulir dengan benar!');
    } else {}
});

// Feedback warna saat user mulai mengetik 
const formInputs = document.querySelectorAll('.contact form input, .contact form textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        // Jika input tidak kosong, ubah border kembali ke warna utama
        if (input.value.trim().length > 0) {
            input.style.borderColor = 'var(--main-color)';
        }
    });
});

// External Libraries
// Typed.js
if (document.querySelector(".multiple-text")) {
    new Typed('.multiple-text', {
        strings: ['Data Analyst', 'Data Scientist', 'Web Developer', 'Data Engineer'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
    });
}
