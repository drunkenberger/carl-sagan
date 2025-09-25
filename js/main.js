// Variables globales
let currentFactIndex = 0;
const facts = document.querySelectorAll('.fact-card');

// Variables del carousel
let currentSlide = 0;
const totalSlides = 3;
let carouselInterval;
const CAROUSEL_INTERVAL = 5000; // 5 segundos

// Funciones de navegación
function abrirJuego() {
    // Ir directamente al juego clásico original
    window.location.href = 'assets/juego/juego_carl.html';
    reproducirSonido('click');
}

function abrirCuento() {
    ocultarTodo();
    document.getElementById('cuento-section').classList.remove('hidden');
    document.getElementById('cuento-iframe').src = 'assets/cuento/index.html';
    reproducirSonido('click');
}

function abrirAudioCuento() {
    ocultarTodo();
    document.getElementById('audiocuento-section').classList.remove('hidden');
    reproducirSonido('click');
}

function abrirBiografia() {
    ocultarTodo();
    document.getElementById('biografia-section').classList.remove('hidden');
    reproducirSonido('click');

    // Opcional: Log para debugging
    console.log('Abriendo biografía de Carl Sagan');
}


// Abrir presentación externa en nueva ventana
function openExternalPresentation() {
    const url = 'https://gamma.app/docs/Quien-fue-Carl-Sagan-asfk2f9o1o5w1t9?mode=doc';

    // Abrir en nueva ventana/pestaña
    window.open(url, '_blank', 'noopener,noreferrer');

    // Cerrar el modal si está abierto
    const modal = document.getElementById('fullscreen-modal');
    if (modal.classList.contains('active')) {
        closePresentationFullscreen();
    }

    reproducirSonido('click');
    console.log('🚀 Abriendo presentación externa en Gamma');
}

// Cargar embed en el modal
function loadEmbedInModal() {
    const iframe = document.getElementById('fullscreen-iframe');
    const options = document.querySelector('.fullscreen-options');

    // Ocultar opciones y mostrar iframe
    options.style.display = 'none';
    iframe.classList.remove('hidden');

    // Configurar el iframe del modal
    iframe.src = 'https://gamma.app/embed/asfk2f9o1o5w1t9';

    reproducirSonido('click');
    console.log('📺 Cargando presentación embebida en modal');
}

function closePresentationFullscreen() {
    const modal = document.getElementById('fullscreen-modal');
    const iframe = document.getElementById('fullscreen-iframe');
    const options = document.querySelector('.fullscreen-options');

    // Remover clase active para animación de salida
    modal.classList.remove('active');

    // Esperar a que termine la animación
    setTimeout(() => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        // Limpiar el iframe para detener la reproducción
        iframe.src = '';

        // Restaurar estado inicial
        iframe.classList.add('hidden');
        options.style.display = 'flex';

        // Restaurar scroll del body
        document.body.style.overflow = '';
    }, 300);

    reproducirSonido('back');
    console.log('✖️ Modal de presentación cerrado');
}


// Cerrar modal con tecla Escape
function setupModalKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('fullscreen-modal');
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            event.preventDefault();
            closePresentationFullscreen();
        }
    });
}

function abrirVideos() {
    ocultarTodo();
    document.getElementById('videos-section').classList.remove('hidden');
    reproducirSonido('click');

    // Log para debugging
    console.log('🌌 Abriendo sección de Videos de Cosmos');
}

function hablarConCarl() {
    ocultarTodo();
    document.getElementById('chat-section').classList.remove('hidden');
    reproducirSonido('click');
}

// === CARLITO AGENT FUNCTIONALITY ===
// El widget de ElevenLabs se maneja automáticamente
// No necesitamos funciones adicionales para el agente embebido

// Función opcional para inicializar el widget si es necesario
function initCarlitoWidget() {
    const widgetContainer = document.getElementById('widget-container');
    if (widgetContainer) {
        console.log('🤖 Widget de Carlito inicializado');

        // Agregar algún estilo o configuración adicional si es necesario
        widgetContainer.style.opacity = '1';
        widgetContainer.style.transition = 'opacity 0.5s ease';
    }
}

// === DIGITAL STORY VIEWER FUNCTIONALITY ===
let currentStoryPage = 1;
const totalStoryPages = 15;
let isAutoPlayActive = false;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 4000; // 4 segundos por página

// Inicializar el visor del cuento
function initDigitalStoryViewer() {
    generateThumbnails();
    updateStoryDisplay();
    setupStoryKeyboardEvents();

    console.log('📖 Visor del cuento digital inicializado');
}

// Generar miniaturas de páginas
function generateThumbnails() {
    const thumbnailsContainer = document.getElementById('story-thumbnails');
    if (!thumbnailsContainer) return;

    thumbnailsContainer.innerHTML = '';

    for (let i = 1; i <= totalStoryPages; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${i === 1 ? 'active' : ''}`;
        thumbnail.onclick = () => goToStoryPage(i);
        thumbnail.innerHTML = `
            <img src="assets/cuento/cuento-digital/carlcuento${i}.png"
                 alt="Página ${i}"
                 loading="lazy">
            <span class="thumbnail-number">${i}</span>
        `;

        thumbnailsContainer.appendChild(thumbnail);
    }
}

// Navegar a página específica
function goToStoryPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalStoryPages) return;

    currentStoryPage = pageNumber;
    updateStoryDisplay();
    addPageTransitionEffect();
    reproducirSonido('click');
}

// Página anterior
function previousStoryPage() {
    if (currentStoryPage > 1) {
        goToStoryPage(currentStoryPage - 1);
    }
}

// Página siguiente
function nextStoryPage() {
    if (currentStoryPage < totalStoryPages) {
        goToStoryPage(currentStoryPage + 1);
    } else {
        // Si es la última página y está en auto-play, detener
        if (isAutoPlayActive) {
            toggleAutoPlay();
        }
    }
}

// Actualizar la visualización del cuento
function updateStoryDisplay() {
    // Actualizar imagen principal
    const storyImage = document.getElementById('story-image');
    if (storyImage) {
        storyImage.src = `assets/cuento/cuento-digital/carlcuento${currentStoryPage}.png`;
        storyImage.alt = `Página ${currentStoryPage} del cuento de Carl Sagan`;
    }

    // Actualizar contador de páginas
    const currentPageSpan = document.getElementById('current-page');
    if (currentPageSpan) {
        currentPageSpan.textContent = currentStoryPage;
    }

    // Actualizar barra de progreso
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progress = (currentStoryPage / totalStoryPages) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Actualizar estado de botones
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentStoryPage === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentStoryPage === totalStoryPages;
    }

    // Actualizar miniaturas
    updateThumbnailsHighlight();
}

// Actualizar resaltado de miniaturas
function updateThumbnailsHighlight() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index + 1 === currentStoryPage);
    });
}

// Toggle auto-play
function toggleAutoPlay() {
    isAutoPlayActive = !isAutoPlayActive;
    const autoPlayBtn = document.getElementById('auto-play-btn');

    if (isAutoPlayActive) {
        startAutoPlay();
        autoPlayBtn.classList.add('active');
        autoPlayBtn.querySelector('.btn-text').textContent = 'Pausar';
        autoPlayBtn.querySelector('.btn-icon').textContent = '⏸️';
    } else {
        stopAutoPlay();
        autoPlayBtn.classList.remove('active');
        autoPlayBtn.querySelector('.btn-text').textContent = 'Auto';
        autoPlayBtn.querySelector('.btn-icon').textContent = '⏯️';
    }

    reproducirSonido('click');
    console.log('📖 Auto-play:', isAutoPlayActive ? 'Activado' : 'Desactivado');
}

// Iniciar auto-play
function startAutoPlay() {
    stopAutoPlay(); // Limpiar cualquier interval previo

    autoPlayInterval = setInterval(() => {
        if (currentStoryPage < totalStoryPages) {
            nextStoryPage();
        } else {
            // Llegar al final, detener auto-play
            toggleAutoPlay();
        }
    }, AUTO_PLAY_DELAY);
}

// Detener auto-play
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Efectos de transición de página
function addPageTransitionEffect() {
    const storyPage = document.getElementById('story-page');
    const magicSparkles = document.getElementById('magic-sparkles');

    if (storyPage) {
        storyPage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            storyPage.style.transform = 'scale(1)';
        }, 200);
    }

    // Agregar partículas mágicas
    if (magicSparkles) {
        createMagicSparkles();
    }
}

// Crear partículas mágicas
function createMagicSparkles() {
    const container = document.getElementById('magic-sparkles');
    if (!container) return;

    // Limpiar partículas existentes
    container.innerHTML = '';

    // Crear 8 partículas
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 0.8 + 's';

        container.appendChild(sparkle);

        // Remover después de la animación
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

// Eventos de teclado para navegación
function setupStoryKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        // Solo si la sección del cuento está visible
        const cuentoSection = document.getElementById('cuento-section');
        if (cuentoSection && !cuentoSection.classList.contains('hidden')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    previousStoryPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextStoryPage();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToStoryPage(1);
                    break;
                case 'End':
                    e.preventDefault();
                    goToStoryPage(totalStoryPages);
                    break;
            }
        }
    });
}


function volverInicio() {
    ocultarTodo();
    document.querySelector('.activities-grid').style.display = 'grid';
    document.querySelector('.hero-section').style.display = 'block';
    document.querySelector('.fun-facts').style.display = 'block';
    // Reiniciar carousel al volver
    startCarouselAutoplay();
    reproducirSonido('back');
}

function ocultarTodo() {
    document.querySelector('.activities-grid').style.display = 'none';
    document.querySelector('.hero-section').style.display = 'none';
    document.querySelector('.fun-facts').style.display = 'none';
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
}


// Efectos de sonido
function reproducirSonido(tipo) {
    const audio = new Audio();
    switch(tipo) {
        case 'click':
            // Sonido de click generado con Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'back':
            // Sonido diferente para volver
            const audioContext2 = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator2 = audioContext2.createOscillator();
            const gainNode2 = audioContext2.createGain();

            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext2.destination);

            oscillator2.frequency.value = 600;
            oscillator2.type = 'sine';

            gainNode2.gain.setValueAtTime(0.3, audioContext2.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext2.currentTime + 0.15);

            oscillator2.start(audioContext2.currentTime);
            oscillator2.stop(audioContext2.currentTime + 0.15);
            break;
    }
}

// === CAROUSEL DE FOTOS DE CARL SAGAN ===
function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (track && slides.length > 0) {
        // Mover el track
        const translateX = -(currentSlide * (100 / totalSlides));
        track.style.transform = `translateX(${translateX}%)`;

        // Actualizar slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetCarouselInterval();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetCarouselInterval();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    resetCarouselInterval();
}

function startCarouselAutoplay() {
    carouselInterval = setInterval(() => {
        nextSlide();
    }, CAROUSEL_INTERVAL);
}

function stopCarouselAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resetCarouselInterval() {
    stopCarouselAutoplay();
    startCarouselAutoplay();
}

// Pausar carousel cuando el mouse está sobre él
function setupCarouselEvents() {
    const carousel = document.querySelector('.carl-photo-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarouselAutoplay);
        carousel.addEventListener('mouseleave', startCarouselAutoplay);

        // También pausar en focus para accesibilidad
        carousel.addEventListener('focusin', stopCarouselAutoplay);
        carousel.addEventListener('focusout', startCarouselAutoplay);
    }
}

// Soporte para swipe en dispositivos táctiles
function setupCarouselSwipe() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = startX - endX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe izquierda - siguiente slide
                nextSlide();
            } else {
                // Swipe derecha - slide anterior
                previousSlide();
            }
        }
    }
}

// Navegación por teclado
function setupCarouselKeyboard() {
    document.addEventListener('keydown', (e) => {
        const carousel = document.querySelector('.carl-photo-carousel');
        if (carousel && carousel.matches(':hover, :focus-within')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides - 1);
                    break;
            }
        }
    });
}

// Carrusel de datos curiosos
function cambiarDatoCurioso() {
    facts.forEach(fact => fact.classList.remove('active'));
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    facts[currentFactIndex].classList.add('active');
}

// Inicializar carruseles
setInterval(cambiarDatoCurioso, 5000);

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    const avatar = document.getElementById('carl-avatar');
    if (avatar) {
        // Si no hay imagen, usar emoji
        avatar.onerror = function() {
            const avatarContainer = document.querySelector('.carl-avatar');
            avatarContainer.innerHTML = '👨‍🔬';
        };
    }


    // Inicializar carousel de Carl Sagan
    updateCarousel();
    setupCarouselEvents();
    setupCarouselSwipe();
    setupCarouselKeyboard();
    startCarouselAutoplay();

    // Inicializar Radio Cosmos
    initRadioCosmos();

    // Configurar eventos del modal
    setupModalKeyboardEvents();

    // Inicializar widget de Carlito
    setTimeout(initCarlitoWidget, 1000); // Esperar a que el widget se cargue

    // Inicializar visor del cuento digital
    initDigitalStoryViewer();

    // Manejar errores de carga de imágenes del carousel
    const carouselImages = document.querySelectorAll('.carl-photo img');
    carouselImages.forEach((img, index) => {
        img.onerror = function() {
            // Si la imagen no carga, mostrar un placeholder
            this.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23333'/><text x='50%' y='50%' font-family='Arial' font-size='16' fill='%23fff' text-anchor='middle' dy='0.3em'>Foto ${index + 1} de Carl Sagan%0A(Coloca tu imagen aquí)</text></svg>`;
        };
    });

    // Agregar efectos de partículas al mover el mouse
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.98) {
            crearParticula(e.clientX, e.clientY);
        }
    });
});

// Crear partículas mágicas
function crearParticula(x, y) {
    const particula = document.createElement('div');
    particula.style.position = 'fixed';
    particula.style.left = x + 'px';
    particula.style.top = y + 'px';
    particula.style.width = '10px';
    particula.style.height = '10px';
    particula.style.background = 'radial-gradient(circle, #FFD700, transparent)';
    particula.style.borderRadius = '50%';
    particula.style.pointerEvents = 'none';
    particula.style.zIndex = '9999';
    particula.style.animation = 'particleFloat 2s ease-out forwards';

    document.body.appendChild(particula);

    setTimeout(() => {
        particula.remove();
    }, 2000);
}

// Agregar animación CSS para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activarModoEspecial();
    }
});

function activarModoEspecial() {
    document.body.style.animation = 'rainbow 3s linear infinite';

    const specialStyle = document.createElement('style');
    specialStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(specialStyle);

    agregarMensaje('¡Has descubierto el modo arcoíris secreto! 🌈✨ ¡Carl está muy orgulloso de ti!', 'carl');

    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// === RADIO COSMOS FUNCTIONALITY ===
let radioWidget = null;
let radioAudio = null;
let isRadioPlaying = false;
let isRadioMinimized = false;
let currentTrackIndex = 0;
let radioPlaylist = [];

// Función para mezclar array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Configurar playlist al cargar la página
function setupRadioPlaylist() {
    const originalPlaylist = [
        {
            title: 'Carl Sagan Superstar',
            artist: 'Radio Cosmos',
            src: 'assets/canciones/Carl Sagan Superstar.mp3'
        },
        {
            title: 'El Viajero de las Estrellas',
            artist: 'Carl Sagan',
            src: 'assets/canciones/Carl Sagan_ El Viajero de las Estrellas.mp3'
        },
        {
            title: 'Estrellas y Más',
            artist: 'Carl Sagan',
            src: 'assets/canciones/Carl Sagan_ Estrellas y Más.mp3'
        },
        {
            title: 'Estrellas y Más (Extended)',
            artist: 'Carl Sagan',
            src: 'assets/canciones/Carl Sagan_ Estrellas y Más (1).mp3'
        }
    ];

    // Mezclar la playlist aleatoriamente
    radioPlaylist = shuffleArray(originalPlaylist);

    // Resetear el índice de la canción actual
    currentTrackIndex = 0;

    console.log('🎵 Radio Cosmos: Playlist mezclada. Primera canción:', radioPlaylist[0].title);
}

// Toggle del widget (minimizar/expandir)
function toggleRadioWidget() {
    const widget = document.getElementById('radio-widget');
    const toggleIcon = document.querySelector('.toggle-icon');

    isRadioMinimized = !isRadioMinimized;

    if (isRadioMinimized) {
        widget.classList.add('minimized');
        toggleIcon.textContent = '+';
    } else {
        widget.classList.remove('minimized');
        toggleIcon.textContent = '−';
    }
}

// Control de reproducción/pausa
function togglePlayPause() {
    const audio = document.getElementById('radio-audio');
    const playIcon = document.getElementById('play-icon');
    const visualizer = document.getElementById('radio-visualizer');

    if (isRadioPlaying) {
        audio.pause();
        playIcon.textContent = '▶️';
        visualizer.classList.remove('playing');
        isRadioPlaying = false;
    } else {
        audio.play();
        playIcon.textContent = '⏸️';
        visualizer.classList.add('playing');
        isRadioPlaying = true;
    }

    reproducirSonido('click');
}

// Siguiente canción
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % radioPlaylist.length;
    loadCurrentTrack();
    reproducirSonido('click');
}

// Canción anterior
function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + radioPlaylist.length) % radioPlaylist.length;
    loadCurrentTrack();
    reproducirSonido('click');
}

// Cargar canción actual
function loadCurrentTrack() {
    const audio = document.getElementById('radio-audio');
    const songTitle = document.getElementById('current-song-title');
    const track = radioPlaylist[currentTrackIndex];

    audio.src = track.src;
    songTitle.textContent = track.title;

    // Si estaba reproduciendo, continuar reproduciendo
    if (isRadioPlaying) {
        audio.play();
    }

    // Actualizar frecuencia (simulada)
    updateFrequency();
}

// Actualizar frecuencia simulada aleatoria
function updateFrequency() {
    const frequencyDisplay = document.querySelector('.frequency-number');
    const randomFreq = generateRandomFrequency();
    frequencyDisplay.textContent = randomFreq;

    // Pequeña animación al cambiar frecuencia
    frequencyDisplay.style.transform = 'scale(1.1)';
    frequencyDisplay.style.textShadow = '0 0 15px rgba(0, 255, 255, 0.8)';

    setTimeout(() => {
        frequencyDisplay.style.transform = 'scale(1)';
        frequencyDisplay.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
    }, 300);
}

// Control de volumen
function setupVolumeControl() {
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const audio = document.getElementById('radio-audio');

    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        volumeValue.textContent = this.value + '%';
    });

    // Establecer volumen inicial
    audio.volume = 0.7;
}

// Eventos del audio
function setupRadioAudioEvents() {
    const audio = document.getElementById('radio-audio');

    audio.addEventListener('ended', function() {
        nextTrack();
    });

    audio.addEventListener('loadstart', function() {
        console.log('Cargando canción:', radioPlaylist[currentTrackIndex].title);
    });

    audio.addEventListener('error', function(e) {
        console.error('Error cargando audio:', e);
        // Intentar siguiente canción si hay error
        nextTrack();
    });
}

// Generar frecuencia aleatoria para cada canción
function generateRandomFrequency() {
    const frequencies = ['107.5', '104.3', '101.9', '98.7', '95.1', '102.8', '106.2', '99.9'];
    return frequencies[Math.floor(Math.random() * frequencies.length)];
}

// Inicializar Radio Cosmos
function initRadioCosmos() {
    setupRadioPlaylist();
    setupVolumeControl();
    setupRadioAudioEvents();
    loadCurrentTrack();

    // Cargar canción inicial
    const audio = document.getElementById('radio-audio');
    audio.load();

    console.log('📻 Radio Cosmos inicializado con', radioPlaylist.length, 'canciones en orden aleatorio');
}