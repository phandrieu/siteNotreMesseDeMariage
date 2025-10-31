// Animations et interactions de qualité pour NotreMesseDeMariage

// ============= NAVIGATION SCROLL EFFECT =============
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter l'effet scrolled à la navigation
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Cache la navigation lors du scroll vers le bas, affiche lors du scroll vers le haut
    if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============= INTERSECTION OBSERVER POUR ANIMATIONS =============
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.feature-card, .content-box, .pricing-card, .feature-list li, .section-title, .section-subtitle');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Décalage progressif pour effet cascade
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeInObserver.observe(element);
});

// ============= INTERSECTION OBSERVER POUR FADE-IN, SECTION-HEADER ET STEPS =============
const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            inViewObserver.unobserve(entry.target); // Ne déclencher qu'une fois
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observer tous les éléments qui nécessitent la classe in-view
const inViewElements = document.querySelectorAll('.fade-in, .section-header, .step, .gallery-item');
inViewElements.forEach(element => {
    inViewObserver.observe(element);
});

// ============= PARALLAX EFFECT SUR HERO =============
const heroSection = document.querySelector('.page-hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ============= SMOOTH SCROLL POUR LES LIENS D'ANCRAGE =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============= ANIMATION DES COMPTEURS =============
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
};

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-counter'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ============= EFFET TYPING POUR LES TITRES =============
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-primary)';
    
    const typing = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    };
    
    typing();
};

// ============= BOUTONS AVEC EFFET RIPPLE =============
const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
};

document.querySelectorAll('.btn-primary, .cta-button').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Styles pour l'effet ripple
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============= EFFET HOVER 3D SUR LES CARTES =============
const cards = document.querySelectorAll('.feature-card, .pricing-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
    
    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// ============= LAZY LOADING DES IMAGES =============
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============= ANIMATION DE LA GALERIE =============
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.gallery-item').forEach(item => {
    galleryObserver.observe(item);
});

// ============= PARTICULES FLOTTANTES DANS LE HERO =============
const createFloatingParticles = () => {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 2}px;
            height: ${Math.random() * 8 + 2}px;
            background: radial-gradient(circle, rgba(255, 129, 0, 0.4), rgba(101, 45, 144, 0.2));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * -20}s;
            opacity: 0.6;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
};

// Animation CSS pour les particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Lancer la création des particules
createFloatingParticles();

// ============= AMÉLIORATION DES PERFORMANCES =============
// Debounce pour optimiser les événements de scroll
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ============= EFFET DE CHARGEMENT DE LA PAGE =============
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============= ANIMATION AU SURVOL DES LIENS =============
document.querySelectorAll('.feature-list li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 129, 0, 0.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
    });
});

console.log('✨ Animations NotreMesseDeMariage chargées avec succès');
