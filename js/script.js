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
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
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

    // Photo Carousel
    const photoCarousel = document.getElementById('photo-carousel');
    const photoPrevBtn = document.getElementById('photo-prev');
    const photoNextBtn = document.getElementById('photo-next');
    
    let photoCurrentIndex = 0;
    const photoTotalSlides = 8; // 8 photos
    const photoVisibleSlides = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const photoMaxIndex = photoTotalSlides - photoVisibleSlides;

    function updatePhotoCarousel() {
        if (photoCarousel) {
            const translateX = -photoCurrentIndex * (100 / photoVisibleSlides);
            photoCarousel.style.transform = `translateX(${translateX}%)`;
        }
    }

    function nextPhoto() {
        if (photoCurrentIndex < photoMaxIndex) {
            photoCurrentIndex++;
            updatePhotoCarousel();
        } else {
            photoCurrentIndex = 0; // Loop back to start
            updatePhotoCarousel();
        }
    }

    function prevPhoto() {
        if (photoCurrentIndex > 0) {
            photoCurrentIndex--;
            updatePhotoCarousel();
        } else {
            photoCurrentIndex = photoMaxIndex; // Loop to end
            updatePhotoCarousel();
        }
    }

    // Event listeners
    if (photoNextBtn) {
        photoNextBtn.addEventListener('click', nextPhoto);
    }
    
    if (photoPrevBtn) {
        photoPrevBtn.addEventListener('click', prevPhoto);
    }

    // Auto-play
    setInterval(nextPhoto, 5000);

    // Update on window resize
    window.addEventListener('resize', function() {
        const newVisibleSlides = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        if (newVisibleSlides !== photoVisibleSlides) {
            location.reload(); // Simple solution for responsive carousel
        }
    });
});