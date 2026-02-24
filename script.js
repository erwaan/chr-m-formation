/* script.js */

// ==========================================
// COMPOSANTS HTML (Header & Footer)
// ==========================================

const HEADER_HTML = `
<nav class="navbar">
    <div class="container">
        <a href="index.html" class="logo">
            <img src="images/logo-chr.jpg" alt="CHR M Formation" class="logo-img">
        </a>
        <ul class="nav-menu">
            <li><a href="index.html#accueil" class="nav-link">Accueil</a></li>
            <li><a href="index.html#presentation" class="nav-link">Présentation</a></li>
            <li><a href="index.html#formations" class="nav-link">Formations</a></li>
            <li><a href="index.html#team-building" class="nav-link">Team Building</a></li>
            <li><a href="index.html#actualites" class="nav-link">Actualités</a></li>
            <li><a href="index.html#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="burger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>CHR M Formation</h3>
                <p>Formations pour les professionnels des Cafés, Hôtels et Restaurants.</p>
            </div>
            <div class="footer-section">
                <h3>Liens rapides</h3>
                <ul class="footer-links">
                    <li><a href="index.html#formations">Nos formations</a></li>
                    <li><a href="index.html#team-building">Team Building</a></li>
                    <li><a href="index.html#actualites">Actualités</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
            <h3>Remerciements</h3>
                <p>Photos: Loïc Boisard, Chez Coco, CLPS Brest</p>
                <p>Site internet: Erwan Boisard</p>
            </div>
            <div class="footer-section">
            <h3>Partenaires certifiés Qualiopi</h3>
                <p>UMIH formation (AKTIVEO)</p>
                <p>Ouest Formation Entreprise</p>
                <p>LC formation Bretagne</p>
                <p>CLPS Brest/ Entreprises</p>
            </div>
            <div class="footer-section">
            <h3>Contact</h3>
                <p>📧 chr.m.formation@gmail.com</p>
                <p>📍 Finistère (29), Bretagne</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 CHR M Formation. Tous droits réservés.</p>
        </div>
    </div>
</footer>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Allura&display=swap" rel="stylesheet">
`;

// ==========================================
// CHARGEMENT ET INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    initInteractions();
    initHeroCarousel();
    initScrollAnimations();
    highlightActiveNavLink();
    handleFormspreeSuccess();
});

function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HEADER_HTML;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = FOOTER_HTML;
    }
}

function initInteractions() {
    // Menu Burger
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Accordéons (Programme)
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('.accordion-icon');

            // Toggle active class
            content.classList.toggle('active');

            // Change icon
            if (content.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    // Gestion du formulaire de contact avec Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const formMessage = document.getElementById('form-message');
            
            // Message de chargement
            formMessage.textContent = 'Envoi en cours...';
            formMessage.style.display = 'block';
            formMessage.style.color = '#FFA500';
            formMessage.style.padding = '10px';
            formMessage.style.marginTop = '15px';
            formMessage.style.borderRadius = '4px';
            formMessage.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
            formMessage.style.textAlign = 'center';
            formMessage.style.fontWeight = '500';
        });
    }
}

function handleFormspreeSuccess() {
    // Gestion du retour après envoi Formspree
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.textContent = 'Message envoyé avec succès ! Nous vous répondrons rapidement.';
            formMessage.style.display = 'block';
            formMessage.style.color = '#4CAF50';
            formMessage.style.padding = '10px';
            formMessage.style.marginTop = '15px';
            formMessage.style.borderRadius = '4px';
            formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            formMessage.style.textAlign = 'center';
            formMessage.style.fontWeight = '500';
            
            // Réinitialiser le formulaire
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.reset();
            }
            
            // Nettoyer l'URL
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            
            // Scroll vers le formulaire pour voir le message
            setTimeout(() => {
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
}

function highlightActiveNavLink() {
    // Logique simple pour mettre en surbrillance selon l'URL ou le hash
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.style.color = '#FFD700';
        }
    });
}

// ============================================
// CARROUSEL HERO
// ============================================
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // Change toutes les 5 secondes
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
function initScrollAnimations() {
    const cards = document.querySelectorAll('.fade-in-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}
