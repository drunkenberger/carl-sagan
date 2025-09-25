# 🚀 El Cosmos de Carl - Sitio Educativo para Niños

## 📁 Estructura de Carpetas para Assets

### 🎮 Juego
**Ubicación:** `assets/juego/`
- Coloca aquí todos los archivos de tu juego
- El archivo principal debe llamarse `index.html`
- Incluye todos los recursos del juego (JS, CSS, imágenes, sonidos)

### 📖 Cuento Digital
**Ubicación:** `assets/cuento/`
- Coloca aquí los archivos del cuento digital
- El archivo principal debe llamarse `index.html`
- Incluye todos los recursos del cuento (imágenes, animaciones, audio)

### 🎵 Canciones
**Ubicación:** `assets/canciones/`
- Nombra los archivos como:
  - `cancion1.mp3` - Primera canción
  - `cancion2.mp3` - Segunda canción
  - `cancion3.mp3` - Tercera canción
- Formato recomendado: MP3

### 🗣️ Agente de Voz (ElevenLabs)
**Configuración:**
1. El sitio ya está preparado para integrar ElevenLabs
2. Los usuarios pueden agregar su API Key directamente en el chat
3. La integración está en `js/elevenlabs.js`

### 🖼️ Imágenes
**Ubicación:** `images/`
- `carl-avatar.svg` o `.png` - Avatar de Carl Sagan (opcional)
- Cualquier otra imagen decorativa

## 🚀 Deployment en Netlify

### Opción 1: Arrastrar y Soltar
1. Ve a [netlify.com](https://www.netlify.com)
2. Arrastra toda la carpeta del proyecto al área de deployment
3. ¡Listo! Tu sitio estará en línea

### Opción 2: Git + Netlify
1. Sube el proyecto a GitHub
2. Conecta el repositorio con Netlify
3. Netlify hará deploy automático con cada push

### Configuración Post-Deploy
1. **Variables de entorno (opcional):**
   - Puedes agregar tu API Key de ElevenLabs como variable de entorno en Netlify

2. **Dominio personalizado:**
   - En Netlify > Domain settings > Add custom domain

## 📝 Checklist de Assets

Antes de hacer deploy, asegúrate de tener:

- [ ] Juego en `assets/juego/index.html`
- [ ] Cuento en `assets/cuento/index.html`
- [ ] Tres canciones en `assets/canciones/` (cancion1.mp3, cancion2.mp3, cancion3.mp3)
- [ ] API Key de ElevenLabs (opcional, se puede agregar después)
- [ ] Avatar de Carl (opcional, en `images/carl-avatar.svg`)

## 🎨 Personalización

### Colores principales:
- Dorado: `#FFD700`
- Azul cielo: `#87CEEB`
- Morado espacial: `#8A2BE2`

### Fuente:
- Comic Neue (Google Fonts) - Amigable para niños

### Animaciones:
- Estrellas de fondo animadas
- Elementos flotantes (planetas, cohetes)
- Efectos hover en todas las tarjetas
- Partículas mágicas al mover el mouse

## 🎯 Características Especiales

1. **Modo Arcoíris Secreto:**
   - Código Konami: ↑↑↓↓←→←→BA

2. **Chat Interactivo:**
   - Respuestas educativas adaptadas para niños
   - Integración con voz sintética o ElevenLabs

3. **Datos Curiosos:**
   - Carrusel automático con datos del espacio

4. **Totalmente Responsivo:**
   - Funciona en tablets y móviles

## 📞 Soporte

Si necesitas ayuda con el deployment o configuración de assets, puedes:
1. Revisar la documentación de Netlify
2. Verificar que los archivos estén en las carpetas correctas
3. Asegurarte de que los archivos HTML de juego y cuento se llamen `index.html`

---

¡Que los pequeños exploradores disfruten su viaje por el cosmos! 🌟