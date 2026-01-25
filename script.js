// --- Navbar Scroll ---
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(11, 18, 33, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'rgba(11, 18, 33, 0.85)';
        nav.style.boxShadow = 'none';
    }
});

// --- Mobile Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    const icon = hamburger.querySelector('i');
    if (hamburger.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');

        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- Carousel Logic ---
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.c-next');
const prevBtn = document.querySelector('.c-prev');
const carouselContainer = document.querySelector('.carousel-container');

let currentIndex = 0;
let autoSlideInterval;

const updateSlide = (index) => {
    const amountToMove = -(index * 100);
    track.style.transform = `translateX(${amountToMove}%)`;
    currentIndex = index;
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    }, 5000);
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
});

// Pause on hover, resume on mouseout
carouselContainer.addEventListener('mouseenter', stopAutoSlide);
carouselContainer.addEventListener('mouseleave', startAutoSlide);

// Start auto slide initially
startAutoSlide();

// --- Accordion Logic ---
const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(acc => {
    acc.addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// --- Form Submit ---
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const origText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            btn.innerText = 'Sent!';
            btn.style.background = '#4CAF50';
            form.reset();
            setTimeout(() => {
                btn.innerText = origText;
                btn.style.background = '';
            }, 3000);
        }
    } catch (err) {
        btn.innerText = 'Error';
    }
    btn.disabled = false;
});
