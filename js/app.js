// Header scroll effect
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        nav.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        nav.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('[data-animate]');
animatedElements.forEach(el => observer.observe(el));

// Form validation and submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Basic validation
    if (!nome || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Phone validation (Brazilian format)
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    if (!phoneRegex.test(telefone)) {
        alert('Por favor, insira um telefone válido!');
        return;
    }

    // Create WhatsApp message (SEM E-MAIL)
    const whatsappMessage = `Olá! Meu nome é ${nome}.\n\nTelefone: ${telefone}\n\nMensagem: ${mensagem}`;
    const whatsappURL = `https://wa.me/5547996827641?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Reset form
    contactForm.reset();
});

// Phone mask
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    } else {
        e.target.value = value.substring(0, 11);
    }
});

// Add active class to current nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});



// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = prefix + target.toLocaleString('pt-BR') + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(start).toLocaleString('pt-BR') + suffix;
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}
