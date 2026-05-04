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

    // --- SLIDER PRINCIPAL / MINIATURES ---
    const mainSliderImage = document.getElementById('main-slider-image');
    const mainSliderBg = document.getElementById('main-slider-bg');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    const thumbnailItems = Array.from(thumbnailsContainer.querySelectorAll('.thumbnail-item'));
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 8000; // 8 secondes

    // Array of image sources and their alt texts
    const images = thumbnailItems.map(img => ({
        src: img.src,
        alt: img.alt
    }));

    function updateSliderDisplay() {
        // Ajoute un effet de sortie (disparition et réduction)
        mainSliderImage.classList.add('opacity-0', 'scale-95');
        if (mainSliderBg) mainSliderBg.classList.add('opacity-0');

        setTimeout(() => {
            // Change la source de l'image pendant qu'elle est invisible
            mainSliderImage.src = images[currentIndex].src;
            mainSliderImage.alt = images[currentIndex].alt;
            if (mainSliderBg) mainSliderBg.src = images[currentIndex].src;

            // Une fois la source mise à jour, on réaffiche avec un zoom progressif
            mainSliderImage.classList.remove('opacity-0', 'scale-95');
            if (mainSliderBg) mainSliderBg.classList.remove('opacity-0');
        }, 400); // Délai synchronisé avec la transition CSS

        // Update active thumbnail
        thumbnailItems.forEach((thumb, i) => {
            if (i === currentIndex) {
                thumb.classList.add('active-thumbnail');
                
                // Manually scroll thumbnail into view within its container
                const containerWidth = thumbnailsContainer.offsetWidth;
                const thumbnailWidth = thumb.offsetWidth;
                const thumbnailOffsetLeft = thumb.offsetLeft;

                // Calculate scroll position to center the thumbnail
                const scrollPosition = thumbnailOffsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
                
                thumbnailsContainer.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            } else {
                thumb.classList.remove('active-thumbnail');
            }
        });
    }

    function goToSlide(index) {
        if (index >= 0 && index < images.length) {
            currentIndex = index;
            updateSliderDisplay();
            resetAutoPlay();
        }
    }

    nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % images.length);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + images.length) % images.length);
    });

    // Thumbnail click handler
    thumbnailItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => goToSlide(index));
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide((currentIndex + 1) % images.length);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause auto-play on hover over main image or thumbnails
    mainSliderImage.addEventListener('mouseenter', stopAutoPlay);
    mainSliderImage.addEventListener('mouseleave', startAutoPlay);
    thumbnailsContainer.addEventListener('mouseenter', stopAutoPlay);
    thumbnailsContainer.addEventListener('mouseleave', startAutoPlay);

    // Swipe Tactile simple
    let touchStart = 0;
    mainSliderImage.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
        stopAutoPlay();
    }, {passive: true});
    mainSliderImage.addEventListener('touchend', (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) nextBtn.click(); // Swipe left
        if (touchEnd - touchStart > 50) prevBtn.click(); // Swipe right
        startAutoPlay();
    }, {passive: true});

    // Initialisation
    updateSliderDisplay();
    startAutoPlay();
    
});
