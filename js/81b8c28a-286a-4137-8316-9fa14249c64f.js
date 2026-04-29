document.addEventListener('DOMContentLoaded', function() {

    // Initialisation des animations AOS
   if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            mirror: true
        });
    }

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
    
    // Empêcher la soumission par défaut du formulaire pour éviter l'affichage des données dans l'URL
    const contactForm = whatsappBtn ? whatsappBtn.closest('form') : document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => e.preventDefault());
    }

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
    let photoDirection = 1;
    const photoTotalSlides = 8;

    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 5; // Afficher 5 photos sur les grands écrans
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    let photoVisibleSlides = getVisibleSlides();
    let photoMaxIndex = photoTotalSlides - photoVisibleSlides;

    function updatePhotoCarousel() {
        if (photoCarousel) {
            const translateX = -photoCurrentIndex * (100 / photoVisibleSlides);
            photoCarousel.style.transform = `translateX(${translateX}%)`;
        }
    }

    // Fonctions de navigation pour les boutons et le swipe
    function nextPhoto() {
        stopAutoPlay(); // Arrêter l'autoplay lors d'une interaction manuelle
        photoCurrentIndex = (photoCurrentIndex + 1) % (photoMaxIndex + 1); // Boucle vers le début
        updatePhotoCarousel();
        startAutoPlay(); // Redémarrer l'autoplay
    }

    function prevPhoto() {
        stopAutoPlay(); // Arrêter l'autoplay lors d'une interaction manuelle
        // Boucle vers la fin si on est au début
        photoCurrentIndex = (photoCurrentIndex - 1 + (photoMaxIndex + 1)) % (photoMaxIndex + 1);
        updatePhotoCarousel();
        startAutoPlay(); // Redémarrer l'autoplay
    }

    function autoPlayCarousel() {
        if (photoDirection === 1) {
            if (photoCurrentIndex < photoMaxIndex) {
                photoCurrentIndex++;
            } else {
                photoDirection = -1;
                photoCurrentIndex--;
            }
        } else {
            if (photoCurrentIndex > 0) {
                photoCurrentIndex--;
            } else {
                photoDirection = 1;
                photoCurrentIndex++;
            }
        }

        updatePhotoCarousel();
    }

    let autoPlayInterval = null;

    function startAutoPlay() {
        if (autoPlayInterval !== null) return;
        autoPlayInterval = setInterval(autoPlayCarousel, 3200);
    }

    function stopAutoPlay() {
        if (autoPlayInterval !== null) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners
    if (photoNextBtn) {
        photoNextBtn.addEventListener('click', function() {
            photoDirection = 1;
            nextPhoto();
        });
    }
    
    if (photoPrevBtn) {
        photoPrevBtn.addEventListener('click', function() {
            photoDirection = -1;
            prevPhoto();
        });
    }

    if (photoCarousel) {
        photoCarousel.addEventListener('mouseenter', stopAutoPlay);
        photoCarousel.addEventListener('mouseleave', startAutoPlay);
        
        // Gestion du Swipe (Tactile)
        let touchStartX = 0;
        let touchEndX = 0;

        photoCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        photoCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (touchStartX - touchEndX > threshold) {
                photoDirection = 1;
                nextPhoto();
            } else if (touchEndX - touchStartX > threshold) {
                photoDirection = -1;
                prevPhoto();
            }
        }
    }

    // Auto-play
    startAutoPlay();

    // Update on window resize
    window.addEventListener('resize', function() {
        const newSlidesCount = getVisibleSlides();
        if (newSlidesCount !== photoVisibleSlides) { // Si le nombre de slides visibles a changé
            photoVisibleSlides = newSlidesCount;
            photoMaxIndex = photoTotalSlides - photoVisibleSlides;
            if (photoCurrentIndex > photoMaxIndex) photoCurrentIndex = photoMaxIndex; // Ajuster l'index si hors limites
            if (photoCurrentIndex < 0) photoCurrentIndex = 0; // S'assurer que l'index n'est pas négatif
            updatePhotoCarousel(); // Mettre à jour la position du carrousel
        }
    });
});
