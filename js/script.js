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

    // --- NAVIGATION ---

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const targetElement = document.getElementById(href.substring(1));
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Fermer le menu mobile après navigation
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });

    // Toggle Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // --- FORMULAIRE DE CONTACT ---

    const whatsappBtn = document.getElementById('whatsappBtn');
    const emailBtn = document.getElementById('emailBtn');

    // Empêcher la soumission par défaut du formulaire pour éviter l'affichage des données dans l'URL
    const contactForm = whatsappBtn ? whatsappBtn.closest('form') : document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => e.preventDefault());
    }

    function validateForm() {
        const nom = document.getElementById('nom').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        
        if (nom === '' || telephone === '') {
            alert("Veuillez remplir votre nom et votre numéro de téléphone.");
            return null;
        }
        
        return {
            nom,
            telephone,
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const data = validateForm();
            if (!data) return;
            
            const text = `Bonjour, je m'appelle ${data.nom}. Tél: ${data.telephone}. Email: ${data.email}. Message: ${data.message}. Je souhaite un devis.`;
            const url = `https://wa.me/077959626?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const data = validateForm();
            if (!data) return;
            
            const subject = 'Demande de devis - PEG BTP Service 3D';
            const body = `Nom: ${data.nom}\nTéléphone: ${data.telephone}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
            const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = url;
        });
    }

    // --- CARROUSEL PHOTOS ---

    const photoCarousel = document.getElementById('photo-carousel');
    const photoPrevBtn = document.getElementById('photo-prev');
    const photoNextBtn = document.getElementById('photo-next');
    
    if (photoCarousel) {
        let photoCurrentIndex = 0;
        let photoDirection = 1;
        const photoTotalSlides = 8;
        let autoPlayInterval = null;

        function getVisibleSlides() {
            if (window.innerWidth >= 1024) return 5;
            if (window.innerWidth >= 768) return 3;
            if (window.innerWidth >= 640) return 2;
            return 1;
        }

        let photoVisibleSlides = getVisibleSlides();
        let photoMaxIndex = photoTotalSlides - photoVisibleSlides;

        function updatePhotoCarousel() {
            const translateX = -photoCurrentIndex * (100 / photoVisibleSlides);
            photoCarousel.style.transform = `translateX(${translateX}%)`;
        }

        function nextPhoto() {
            photoCurrentIndex = (photoCurrentIndex + 1) % (photoMaxIndex + 1);
            updatePhotoCarousel();
        }

        function prevPhoto() {
            photoCurrentIndex = (photoCurrentIndex - 1 + (photoMaxIndex + 1)) % (photoMaxIndex + 1);
            updatePhotoCarousel();
        }

        function startAutoPlay() {
            if (autoPlayInterval) return;
            autoPlayInterval = setInterval(() => {
                if (photoDirection === 1) nextPhoto();
                else prevPhoto();
            }, 3200);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }

        // Event Listeners Boutons
        if (photoNextBtn) {
            photoNextBtn.addEventListener('click', () => {
                photoDirection = 1;
                stopAutoPlay();
                nextPhoto();
                startAutoPlay();
            });
        }

        if (photoPrevBtn) {
            photoPrevBtn.addEventListener('click', () => {
                photoDirection = -1;
                stopAutoPlay();
                prevPhoto();
                startAutoPlay();
            });
        }

        // Pause au survol
        photoCarousel.addEventListener('mouseenter', stopAutoPlay);
        photoCarousel.addEventListener('mouseleave', startAutoPlay);

        // Gestion Tactile
        let touchStartX = 0;
        let touchEndX = 0;

        photoCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        photoCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            if (touchStartX - touchEndX > threshold) {
                photoDirection = 1;
                nextPhoto();
            } else if (touchEndX - touchStartX > threshold) {
                photoDirection = -1;
                prevPhoto();
            }
            startAutoPlay();
        }, { passive: true });

        // Lancement initial
        startAutoPlay();

        // Redimensionnement
        window.addEventListener('resize', function() {
            const newSlidesCount = getVisibleSlides();
            if (newSlidesCount !== photoVisibleSlides) {
                photoVisibleSlides = newSlidesCount;
                photoMaxIndex = photoTotalSlides - photoVisibleSlides;
                photoCurrentIndex = Math.min(photoCurrentIndex, photoMaxIndex);
                photoCurrentIndex = Math.max(photoCurrentIndex, 0);
                updatePhotoCarousel();
            }
        });
    }
});
