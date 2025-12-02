// script.js

// ==========================================
// NAVIGATION MOBILE
// ==========================================

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animation du burger
    burger.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ==========================================
// ACTIVE LINK AU SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// FORMULAIRE DE CONTACT
// ==========================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const objet = document.getElementById('objet').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!objet || !email || !message) {
        showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Création du mailto (alternative sans backend)
    const mailtoLink = `mailto:contact@eskemm-chr.fr?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(message + '\n\nEmail de contact: ' + email)}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
    
    // Afficher un message de succès
    showMessage('Votre client email va s\'ouvrir. Merci de votre message !', 'success');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ==========================================
// SMOOTH SCROLL (fallback pour anciens navigateurs)
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
