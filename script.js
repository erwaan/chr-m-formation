/* script.js */

// ==========================================
// COMPOSANTS HTML (Header & Footer)
// ==========================================

const HEADER_HTML = `
<nav class="navbar">
    <div class="container">
        <a href="index.html" class="logo">CHR M <span>Formation</span></a>
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
                <p>Expert en formation pour les professionnels des Cafés, Hôtels et Restaurants.</p>
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
                <h3>Contact</h3>
                <p>📧 contact@chrm-formation.fr</p>
                <p>📞 XX XX XX XX XX</p>
                <p>📍 Finistère (29), Bretagne</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 CHR M Formation. Tous droits réservés.</p>
        </div>
    </div>
</footer>
`;

// ==========================================
// CHARGEMENT ET INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    initInteractions();
    
    // Si on est sur une page spécifique, on active l'onglet navigation
    highlightActiveNavLink();
});

function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HEADER_HTML;
    } else {
        // Fallback si la nav existe déjà en dur (pour transition)
        // console.log("Header placeholder not found, skipping injection.");
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

    // Gestion du formulaire de contact (Simulation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('form-message');
            messageDiv.textContent = "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.";
            messageDiv.style.color = "#FFD700"; // Jaune
            messageDiv.style.marginTop = "10px";
            contactForm.reset();
        });
    }
}

function highlightActiveNavLink() {
    // Logique simple pour mettre en surbrillance selon l'URL ou le hash
    // Ici on peut laisser par défaut ou améliorer plus tard
}
