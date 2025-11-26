// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Sistema de Tabs para el Menú
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remover clase active de todos los botones y paneles
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Agregar clase active al botón clickeado y su panel correspondiente
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Animación al hacer scroll - Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    delay: 0
});

// Aplicar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Animar tarjetas de productos
    const productoCards = document.querySelectorAll('.producto-card');
    const menuItems = document.querySelectorAll('.menu-item');
    const sucursalCards = document.querySelectorAll('.sucursal-card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Inicializar estilos para animación
    [...productoCards, ...menuItems, ...sucursalCards, ...galleryItems].forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    });

    // Observar elementos
    productoCards.forEach(card => fadeInObserver.observe(card));
    menuItems.forEach(item => fadeInObserver.observe(item));
    sucursalCards.forEach(card => fadeInObserver.observe(card));
    galleryItems.forEach(item => fadeInObserver.observe(item));

    // Animar sección nosotros
    const nosotrosImages = document.querySelectorAll('.nosotros-image-main, .nosotros-image-small');
    nosotrosImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        fadeInObserver.observe(img);
    });
});

// Smooth scroll mejorado para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // Ignorar si es solo "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header con efecto al hacer scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Cambiar sombra del header según scroll
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(44, 24, 16, 0.15)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(44, 24, 16, 0.08)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    }

    lastScroll = currentScroll;
});

// Parallax suave para el hero
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Lazy loading para imágenes
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Animación de entrada para la galería
const gallerySection = document.querySelector('.gallery');
if (gallerySection) {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.gallery-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 100);
                });
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    galleryObserver.observe(gallerySection);
}

// Agregar efecto hover a las tarjetas del menú
const menuItemsHover = document.querySelectorAll('.menu-item');
menuItemsHover.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Log de confirmación
console.log('%c🥖 Juanes Panadería', 'font-size: 24px; color: #C9914D; font-weight: bold;');
console.log('%cLanding page cargada correctamente', 'font-size: 14px; color: #8B6F47;');
console.log('%c✓ Menú de navegación móvil', 'color: #4CAF50;');
console.log('%c✓ Sistema de tabs', 'color: #4CAF50;');
console.log('%c✓ Animaciones y transiciones', 'color: #4CAF50;');
console.log('%c✓ Smooth scrolling', 'color: #4CAF50;');
console.log('%c✓ Parallax effect', 'color: #4CAF50;');

// LIGHTBOX PARA GALERÍA DE GALLETA
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');
const galletaThumbs = document.querySelectorAll('.galleta-thumb');
let currentImageIndex = 0;
const galletaImages = Array.from(galletaThumbs).map(thumb => thumb.querySelector('img').src);

if (lightbox && galletaThumbs.length > 0) {
    if (lightboxTotal) lightboxTotal.textContent = galletaImages.length;
    
    galletaThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightboxImg.src = galletaImages[currentImageIndex];
        if (lightboxCurrent) lightboxCurrent.textContent = currentImageIndex + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) currentImageIndex = galletaImages.length - 1;
        if (currentImageIndex >= galletaImages.length) currentImageIndex = 0;
        lightboxImg.src = galletaImages[currentImageIndex];
        if (lightboxCurrent) lightboxCurrent.textContent = currentImageIndex + 1;
    }
    
    document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

// PRODUCTO SLIDER
document.querySelectorAll('.producto-slider').forEach(slider => {
    const imgs = slider.querySelectorAll('.slider-img');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    let currentIndex = 0;

    function showImg(index) {
        imgs.forEach(img => img.classList.remove('active'));
        imgs[index].classList.add('active');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
            showImg(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % imgs.length;
            showImg(currentIndex);
        });
    }
});

// CARRUSEL DE GALLETA DE CAMPAÑA
(function() {
    const carousel = document.querySelector('.galleta-carousel');
    if (!carousel) return;

    const dataItems = carousel.querySelectorAll('.carousel-data > div');
    const prevSlide = carousel.querySelector('.carousel-prev-slide img');
    const mainSlide = carousel.querySelector('.carousel-main-slide img');
    const nextSlide = carousel.querySelector('.carousel-next-slide img');
    const mainLabel = carousel.querySelector('.carousel-label span');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevSlideContainer = carousel.querySelector('.carousel-prev-slide');
    const nextSlideContainer = carousel.querySelector('.carousel-next-slide');

    // Extraer datos de las imágenes
    const images = Array.from(dataItems).map(item => ({
        src: item.dataset.src,
        label: item.dataset.label
    }));

    let currentIndex = 0;
    let isAnimating = false;

    // Crear dots
    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    // Función para obtener índice anterior
    function getPrevIndex(idx) {
        return (idx - 1 + images.length) % images.length;
    }

    // Función para obtener índice siguiente
    function getNextIndex(idx) {
        return (idx + 1) % images.length;
    }

    // Actualizar carrusel
    function updateCarousel(direction = 'none') {
        if (isAnimating) return;
        isAnimating = true;

        const prevIdx = getPrevIndex(currentIndex);
        const nextIdx = getNextIndex(currentIndex);

        // Actualizar imágenes
        prevSlide.src = images[prevIdx].src;
        mainSlide.src = images[currentIndex].src;
        nextSlide.src = images[nextIdx].src;
        mainLabel.textContent = images[currentIndex].label;

        // Actualizar dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Ir a slide específico
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        const direction = index > currentIndex ? 'next' : 'prev';
        currentIndex = index;
        updateCarousel(direction);
    }

    // Navegación
    function navigate(direction) {
        if (isAnimating) return;
        if (direction === 'next') {
            currentIndex = getNextIndex(currentIndex);
        } else {
            currentIndex = getPrevIndex(currentIndex);
        }
        updateCarousel(direction);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));

    // Click en miniaturas
    prevSlideContainer.addEventListener('click', () => navigate('prev'));
    nextSlideContainer.addEventListener('click', () => navigate('next'));

    // Click en imagen principal abre lightbox
    carousel.querySelector('.carousel-main-slide').addEventListener('click', () => {
        if (lightbox && lightboxImg) {
            lightboxImg.src = images[currentIndex].src;
            if (lightboxCurrent) lightboxCurrent.textContent = currentIndex + 1;
            if (lightboxTotal) lightboxTotal.textContent = images.length;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        const carouselInView = carousel.getBoundingClientRect().top < window.innerHeight &&
                               carousel.getBoundingClientRect().bottom > 0;
        if (!carouselInView || lightbox?.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'ArrowRight') navigate('next');
    });

    // Soporte para swipe en móvil
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }
    }, { passive: true });

    // Auto-play opcional (desactivado por defecto)
    // setInterval(() => navigate('next'), 5000);

    // Inicializar
    updateCarousel();

    console.log('%c✓ Carrusel de galleta inicializado', 'color: #4CAF50;');
})();

// CARRUSELES GENÉRICOS (Menús Diarios y Galería)
(function() {
    const genericCarousels = document.querySelectorAll('.generic-carousel');

    genericCarousels.forEach(carousel => {
        const dataItems = carousel.querySelectorAll('.carousel-data > div');
        if (dataItems.length === 0) return;

        const prevSlide = carousel.querySelector('.carousel-prev-slide img');
        const mainSlide = carousel.querySelector('.carousel-main-slide img');
        const nextSlide = carousel.querySelector('.carousel-next-slide img');
        const mainLabel = carousel.querySelector('.carousel-label span');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevSlideContainer = carousel.querySelector('.carousel-prev-slide');
        const nextSlideContainer = carousel.querySelector('.carousel-next-slide');

        // Extraer datos de las imágenes
        const images = Array.from(dataItems).map(item => ({
            src: item.dataset.src,
            label: item.dataset.label
        }));

        let currentIndex = 0;
        let isAnimating = false;

        // Crear dots
        images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function getPrevIndex(idx) {
            return (idx - 1 + images.length) % images.length;
        }

        function getNextIndex(idx) {
            return (idx + 1) % images.length;
        }

        function updateCarousel() {
            if (isAnimating) return;
            isAnimating = true;

            const prevIdx = getPrevIndex(currentIndex);
            const nextIdx = getNextIndex(currentIndex);

            prevSlide.src = images[prevIdx].src;
            mainSlide.src = images[currentIndex].src;
            nextSlide.src = images[nextIdx].src;

            // Mostrar/ocultar etiqueta según si tiene texto
            const labelText = images[currentIndex].label;
            mainLabel.textContent = labelText;
            mainLabel.parentElement.style.display = labelText ? 'block' : 'none';

            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }

        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCarousel();
        }

        function navigate(direction) {
            if (isAnimating) return;
            if (direction === 'next') {
                currentIndex = getNextIndex(currentIndex);
            } else {
                currentIndex = getPrevIndex(currentIndex);
            }
            updateCarousel();
        }

        // Event listeners
        prevBtn.addEventListener('click', () => navigate('prev'));
        nextBtn.addEventListener('click', () => navigate('next'));
        prevSlideContainer.addEventListener('click', () => navigate('prev'));
        nextSlideContainer.addEventListener('click', () => navigate('next'));

        // Soporte para swipe en móvil
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    navigate('next');
                } else {
                    navigate('prev');
                }
            }
        }, { passive: true });

        // Inicializar
        updateCarousel();
    });

    if (genericCarousels.length > 0) {
        console.log('%c✓ Carruseles genéricos inicializados (' + genericCarousels.length + ')', 'color: #4CAF50;');
    }
})();
