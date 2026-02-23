# LanguageAI Mobile

App React Native (Expo) que muestra tu aplicación web en un WebView.

## Configuración

Edita `config.js` y cambia `WEB_URL` por la URL de tu aplicación web:

```js
export const WEB_URL = 'https://tu-app.vercel.app';  // o tu URL de producción
```

## Ejecutar

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar el servidor de desarrollo
npm start

# Luego presiona:
# - i para iOS Simulator
# - a para Android Emulator
# - w para web
```

## Requisitos

- Node.js 20+ (recomendado)
- Expo Go en tu dispositivo móvil (para probar en físico)
- Xcode (para iOS) o Android Studio (para Android)
