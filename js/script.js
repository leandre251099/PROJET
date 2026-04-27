document.addEventListener('DOMContentLoaded', function() {

    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Fermer le menu mobile après navigation
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('opacity-0', '-translate-y-2');
                    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden', 'opacity-0', '-translate-y-2');
                mobileMenu.classList.add('opacity-100', 'translate-y-0');
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-2');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                // Delay hiding to allow animation
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Gestion du formulaire - remplacé par boutons WhatsApp et Email
    const whatsappBtn = document.getElementById('whatsappBtn');
    const emailBtn = document.getElementById('emailBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (nom === '' || telephone === '') {
                alert("Veuillez remplir votre nom et votre numéro de téléphone.");
                return;
            }
            
            const text = `Bonjour, je m'appelle ${nom}. Téléphone: ${telephone}. Email: ${email}. Message: ${message}. Je souhaite un devis pour vos services.`;
            const url = `https://wa.me/077959626?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (nom === '' || telephone === '') {
                alert("Veuillez remplir votre nom et votre numéro de téléphone.");
                return;
            }
            
            const subject = 'Demande de devis - PEG BTP Service 3D';
            const body = `Nom: ${nom}\nTéléphone: ${telephone}\nEmail: ${email}\n\nMessage:\n${message}`;
            const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = url;
        });
    }
});