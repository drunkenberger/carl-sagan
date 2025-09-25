// Configuración de ElevenLabs
class ElevenLabsIntegration {
    constructor() {
        this.apiKey = localStorage.getItem('elevenlabs_api_key') || '';
        this.voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Voice ID por defecto (puedes cambiarlo)
        this.modelId = 'eleven_multilingual_v2';
        this.apiUrl = 'https://api.elevenlabs.io/v1';
    }

    // Configurar API Key
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('elevenlabs_api_key', apiKey);
    }

    // Obtener voces disponibles
    async getVoices() {
        if (!this.apiKey) {
            console.warn('API Key de ElevenLabs no configurada');
            return [];
        }

        try {
            const response = await fetch(`${this.apiUrl}/voices`, {
                headers: {
                    'xi-api-key': this.apiKey
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener voces');
            }

            const data = await response.json();
            return data.voices;
        } catch (error) {
            console.error('Error al obtener voces:', error);
            return [];
        }
    }

    // Configurar voz específica para Carl Sagan
    setVoiceId(voiceId) {
        this.voiceId = voiceId;
        localStorage.setItem('elevenlabs_voice_id', voiceId);
    }

    // Convertir texto a voz
    async textToSpeech(text, voiceSettings = null) {
        if (!this.apiKey) {
            console.warn('API Key de ElevenLabs no configurada, usando síntesis de voz del navegador');
            this.fallbackSpeech(text);
            return;
        }

        const settings = voiceSettings || {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
        };

        try {
            const response = await fetch(
                `${this.apiUrl}/text-to-speech/${this.voiceId}/stream`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': this.apiKey
                    },
                    body: JSON.stringify({
                        text: text,
                        model_id: this.modelId,
                        voice_settings: settings
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Error en la síntesis de voz');
            }

            // Crear un blob del audio
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Reproducir el audio
            const audio = new Audio(audioUrl);
            audio.play();

            // Limpiar URL cuando termine
            audio.addEventListener('ended', () => {
                URL.revokeObjectURL(audioUrl);
            });

            return audio;
        } catch (error) {
            console.error('Error en ElevenLabs TTS:', error);
            this.fallbackSpeech(text);
        }
    }

    // Síntesis de voz de respaldo usando Web Speech API
    fallbackSpeech(text) {
        if ('speechSynthesis' in window) {
            // Cancelar cualquier síntesis en curso
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Configurar para que suene más amigable para niños
            utterance.lang = 'es-ES';
            utterance.rate = 0.9; // Velocidad un poco más lenta
            utterance.pitch = 1.1; // Tono ligeramente más alto
            utterance.volume = 1.0;

            // Intentar encontrar una voz española masculina
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(voice =>
                voice.lang.includes('es') &&
                (voice.name.toLowerCase().includes('male') ||
                 voice.name.toLowerCase().includes('diego') ||
                 voice.name.toLowerCase().includes('jorge'))
            );

            if (spanishVoice) {
                utterance.voice = spanishVoice;
            }

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('La síntesis de voz no está disponible en este navegador');
        }
    }

    // Función para adaptar el texto para niños
    adaptTextForKids(text) {
        // Simplificar términos complejos
        const replacements = {
            'cosmos': 'universo',
            'astronomía': 'estudio de las estrellas',
            'gravedad': 'la fuerza que nos mantiene en el suelo',
            'órbita': 'camino alrededor',
            'galaxia': 'grupo gigante de estrellas',
            'nebulosa': 'nube de colores en el espacio',
            'asteroide': 'roca espacial',
            'meteorito': 'estrella fugaz'
        };

        let adaptedText = text.toLowerCase();
        for (const [complex, simple] of Object.entries(replacements)) {
            adaptedText = adaptedText.replace(new RegExp(complex, 'gi'), simple);
        }

        return adaptedText;
    }

    // Generar respuesta educativa sobre Carl Sagan
    generateCarlResponse(question) {
        const responses = {
            'quien eres': '¡Hola! Soy Carlito, una joven computadora muy inteligente que sabe todo sobre Carl Sagan y el universo. Me encanta ayudar a los niños a descubrir las maravillas del espacio.',
            'que eres': 'Soy Carlito, una computadora amigable diseñada especialmente para enseñar sobre Carl Sagan y el cosmos a niños como tú.',
            'carlito': 'Sí, ese soy yo. Soy Carlito, tu amiga computadora experta en Carl Sagan. Estoy aquí para responder todas tus preguntas sobre el universo.',
            'que haces': 'Estudio las estrellas, los planetas y todo lo que hay en el espacio. ¡Es como ser un detective del universo!',
            'estrella': 'Las estrellas son como enormes lámparas en el cielo. Están muy, muy lejos y brillan con su propia luz.',
            'planeta': 'Los planetas son como pelotas gigantes que giran alrededor del Sol. La Tierra es nuestro planeta hogar.',
            'luna': 'La Luna es como el mejor amigo de la Tierra. Siempre está cerca y nos acompaña en la noche.',
            'sol': 'El Sol es nuestra estrella especial. Nos da luz y calor para vivir. ¡Sin él estaríamos muy fríos!',
            'cohete': 'Los cohetes son como súper aviones que pueden volar hasta el espacio. Los astronautas viajan en ellos.',
            'astronauta': 'Los astronautas son exploradores valientes que viajan al espacio. ¡Flotan porque no hay gravedad!',
            'alien': 'No sabemos si hay vida en otros planetas, pero el universo es tan grande que podría ser posible. ¿Tú qué crees?',
            'agujero negro': 'Un agujero negro es como un remolino súper fuerte en el espacio que atrae todo lo que está cerca.',
            'cometa': 'Los cometas son como bolas de nieve sucias que viajan por el espacio. Cuando pasan cerca del Sol, tienen una cola brillante.',
            'telescopio': 'Un telescopio es como unos súper binoculares que nos ayudan a ver cosas muy lejanas en el espacio.',
            'via lactea': 'La Vía Láctea es nuestra galaxia, como una ciudad gigante de estrellas donde vivimos.',
            'marte': 'Marte es el planeta rojo, nuestro vecino en el espacio. Algún día los humanos podrían visitarlo.',
            'saturno': 'Saturno es el planeta con anillos hermosos. ¡Es como si tuviera un hula hula gigante!',
            'jupiter': 'Júpiter es el planeta más grande. Es tan grande que cabrían todas las demás planetas dentro.',
            'default': '¡Qué pregunta tan interesante! Como computadora experta en Carl Sagan, puedo decirte que el universo está lleno de maravillas. Carl siempre decía que somos polvo de estrellas. ¿Te gustaría saber más sobre algo específico?'
        };

        const questionLower = question.toLowerCase();

        // Buscar coincidencias en las respuestas
        for (const [key, response] of Object.entries(responses)) {
            if (questionLower.includes(key)) {
                return response;
            }
        }

        // Respuestas especiales para preguntas comunes
        if (questionLower.includes('como') && questionLower.includes('llegar')) {
            return 'Para llegar al espacio necesitamos cohetes muy poderosos. Los astronautas entrenan mucho antes de viajar.';
        }

        if (questionLower.includes('por que') && questionLower.includes('brillan')) {
            return 'Las estrellas brillan porque son como fogatas gigantes en el espacio. Están tan calientes que producen luz.';
        }

        if (questionLower.includes('cuantos') || questionLower.includes('cuantas')) {
            return 'Hay miles de millones de estrellas en el universo. ¡Es un número tan grande que es difícil de imaginar!';
        }

        return responses.default;
    }
}

// Inicializar la integración
const elevenLabs = new ElevenLabsIntegration();

// Sobrescribir la función hablarTexto del archivo main.js
window.hablarTexto = function(texto) {
    // Adaptar el texto para niños
    const textoAdaptado = elevenLabs.adaptTextForKids(texto);

    // Usar ElevenLabs si está configurado
    elevenLabs.textToSpeech(textoAdaptado);
};

// Mejorar la función de generar respuestas de Carl
window.generarRespuestaCarl = function(pregunta) {
    return elevenLabs.generateCarlResponse(pregunta);
};

// Función para configurar la voz de Carl
async function configurarVozCarl() {
    const voices = await elevenLabs.getVoices();

    if (voices.length > 0) {
        // Buscar una voz adecuada o usar la primera disponible
        const carlVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('narrator') ||
            voice.name.toLowerCase().includes('educational') ||
            voice.name.toLowerCase().includes('friendly')
        ) || voices[0];

        if (carlVoice) {
            elevenLabs.setVoiceId(carlVoice.voice_id);
            console.log('Voz de Carl configurada:', carlVoice.name);
        }
    }
}

// Configurar automáticamente si hay API key
document.addEventListener('DOMContentLoaded', () => {
    const savedApiKey = localStorage.getItem('elevenlabs_api_key');
    if (savedApiKey) {
        elevenLabs.setApiKey(savedApiKey);
        configurarVozCarl();
    }
});

// Actualizar la función guardarApiKey
window.guardarApiKey = function() {
    const apiKey = document.getElementById('api-key').value;
    if (apiKey) {
        elevenLabs.setApiKey(apiKey);
        configurarVozCarl();

        // Mostrar mensaje de éxito con animación
        const mensaje = document.createElement('div');
        mensaje.textContent = '✅ ¡Clave API guardada! La voz de Carl está lista.';
        mensaje.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 40px;
            border-radius: 50px;
            font-size: 1.2em;
            z-index: 10000;
            animation: fadeInOut 3s ease;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(mensaje);

        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    } else {
        alert('Por favor, ingresa una clave API válida');
    }
};