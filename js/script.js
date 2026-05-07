document.addEventListener('DOMContentLoaded', function() {
    // --- GESTION DU LOADER ---
    const loader = document.getElementById('loader');
    if (loader) {
        document.body.style.overflow = 'hidden'; // Empêche le scroll pendant le chargement
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('loader-hidden');
                document.body.style.overflow = ''; // Rétablit le scroll
            }, 3500); // Augmenté à 3.5s pour correspondre à la nouvelle durée cinématique
        });
    }

    // Initialisation des animations AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            mirror: true
        });
    }

    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Check for saved theme preference or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // --- NAVIGATION ---

    // Gestion du changement d'apparence de la navbar au scroll
    const navbar = document.querySelector('nav');
    const heroSection = document.getElementById('accueil');
    const logoText = navbar.querySelector('h1');
    const navLinks = navbar.querySelectorAll('.nav-link');
    const themeBtn = document.getElementById('theme-toggle');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileBtnIcon = mobileBtn.querySelector('i'); // Cibler l'icône à l'intérieur du bouton mobile
    
    const navbarInnerContainer = document.getElementById('navbar-inner-container');
    const navbarLogoImg = document.getElementById('navbar-logo-img');
    const navbarLinksDesktop = document.getElementById('navbar-links-desktop');

    const handleNavbarScroll = () => {
        // Utilisation de pageYOffset pour une meilleure compatibilité mobile (iOS/Android)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        // Détection plus fiable du mode mobile via matchMedia (lg = 1024px)
        const isMobile = window.matchMedia("(max-width: 1023px)").matches;

        if (isMobile) {
            if (scrollTop > (heroHeight - 100)) {
                // Effet de disparition fluide : glissement vers le haut et fondu
                navbar.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            } else {
                navbar.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        } else {
            navbar.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
            if (scrollTop > (heroHeight - 100)) {
                // État Opaque (Sortie du Hero)
                navbar.classList.add('bg-white/95', 'dark:bg-slate-900/95', 'backdrop-blur-md', 'shadow-md', 'scrolled');
                navbar.classList.remove('bg-black/10', 'backdrop-blur-[2px]', 'shadow-lg');

                // Réduire le padding du conteneur interne
                navbarInnerContainer.classList.remove('py-6');
                navbarInnerContainer.classList.add('py-3');
                
                // Réduire la taille du logo
                navbarLogoImg.classList.remove('w-20', 'h-20', 'sm:w-24', 'lg:w-32');
                navbarLogoImg.classList.add('w-14', 'h-14', 'sm:w-16', 'lg:w-20');

                // Réduire la taille du texte du logo
                logoText.classList.add('text-emerald-700', 'dark:text-emerald-400');
                logoText.classList.remove('text-white', 'text-xl', 'sm:text-2xl', 'md:text-3xl', 'lg:text-4xl');
                logoText.classList.add('text-lg', 'sm:text-xl', 'md:text-2xl', 'lg:text-3xl');
                
                navLinks.forEach(link => {
                    link.classList.add('text-emerald-900', 'dark:text-emerald-50');
                    link.classList.remove('text-white/90');
                });
                // Réduire la taille du texte des liens de navigation desktop
                navbarLinksDesktop.classList.remove('text-xl');
                navbarLinksDesktop.classList.add('text-base');

                themeBtn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-emerald-600', 'dark:text-emerald-400', 'hover:bg-slate-200', 'dark:hover:bg-slate-700');
                themeBtn.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/20', 'p-3');
                themeBtn.classList.add('p-2'); // Réduire le padding du bouton de thème

                // Bouton du menu mobile (quand opaque)
                mobileBtn.classList.add('text-emerald-700', 'dark:text-emerald-400', 'hover:text-emerald-800', 'dark:hover:text-emerald-300', 'bg-slate-100', 'dark:bg-slate-800', 'hover:bg-slate-200', 'dark:hover:bg-slate-700');
                mobileBtn.classList.remove('text-white', 'bg-transparent', 'text-3xl', 'p-2');
                mobileBtn.classList.add('text-2xl', 'p-1.5'); // Réduire la taille et le padding du bouton mobile
                mobileBtnIcon.classList.remove('shadow-sm'); // Supprime l'ombre de l'icône mobile
            } else {
                // État Transparent (Dans le Hero)
                navbar.classList.remove('bg-white/95', 'dark:bg-slate-900/95', 'backdrop-blur-md', 'shadow-md', 'scrolled');
                navbar.classList.add('bg-black/10', 'backdrop-blur-[2px]', 'shadow-lg');
                
                // Restaurer le padding du conteneur interne
                navbarInnerContainer.classList.remove('py-3');
                navbarInnerContainer.classList.add('py-6');

                // Restaurer la taille du logo
                navbarLogoImg.classList.remove('w-14', 'h-14', 'sm:w-16', 'lg:w-20');
                navbarLogoImg.classList.add('w-20', 'h-20', 'sm:w-24', 'lg:w-32');

                // Restaurer la taille du texte du logo
                logoText.classList.remove('text-emerald-700', 'dark:text-emerald-400', 'text-lg', 'sm:text-xl', 'md:text-2xl', 'lg:text-3xl');
                logoText.classList.add('text-white', 'text-xl', 'sm:text-2xl', 'md:text-3xl', 'lg:text-4xl');
                
                navLinks.forEach(link => {
                    link.classList.remove('text-emerald-900', 'dark:text-emerald-50');
                    link.classList.add('text-white/90');
                });
                // Restaurer la taille du texte des liens de navigation desktop
                navbarLinksDesktop.classList.remove('text-base');
                navbarLinksDesktop.classList.add('text-xl');

                themeBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-emerald-600', 'dark:text-emerald-400', 'hover:bg-slate-200', 'dark:hover:bg-slate-700', 'p-2');
                themeBtn.classList.add('bg-white/10', 'text-white', 'hover:bg-white/20', 'p-3');

                mobileBtn.classList.remove('text-emerald-700', 'dark:text-emerald-400', 'hover:text-emerald-800', 'dark:hover:text-emerald-300', 'bg-slate-100', 'dark:bg-slate-800', 'hover:bg-slate-200', 'dark:hover:bg-slate-700', 'text-2xl', 'p-1.5');
                mobileBtn.classList.add('text-white', 'bg-transparent', 'text-3xl', 'p-2');
                mobileBtnIcon.classList.add('shadow-sm'); // Ajoute l'ombre de l'icône mobile
            }
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Appel initial

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

    // Swipe Tactile optimisé sur le conteneur
    let touchStart = 0;
    const sliderDisplay = mainSliderImage.closest('.main-image-display');
    
    sliderDisplay.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
        stopAutoPlay();
    }, {passive: true});
    sliderDisplay.addEventListener('touchend', (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 40) nextBtn.click(); // Swipe left (plus sensible)
        if (touchEnd - touchStart > 40) prevBtn.click(); // Swipe right
        startAutoPlay();
    }, {passive: true});

    // Initialisation
    updateSliderDisplay();
    startAutoPlay();
    
});
