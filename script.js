let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.addEventListener('scroll', () => {
    // Tutup menu saat scroll
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Header berubah saat scroll
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);

    // Highlight navbar link yang aktif
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const typed = new Typed('.multiple-text', {
    strings: ['Data Analyst', 'Data Scientist', 'Web Developer', 'Data Engineer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1000,
    loop: true,
});

document.querySelector('.contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            valid = false;
        } else {
            input.style.borderColor = 'var(--main-color)';
        }
    });

    if (valid) alert('Pesan berhasil dikirim!');
});