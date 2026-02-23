/**
 * Script inyectado en el WebView (después de cargar la página, como onPageFinished en Android).
 * Reemplaza window.speechSynthesis para usar el bridge nativo vía postMessage.
 * Mismo patrón que la app Android que funciona.
 */
export const TTS_BRIDGE_INJECTION = `
(function() {
  if (typeof window === 'undefined') return;
  
  if (window.ReactNativeWebView) {
    window.speechSynthesis = {
      speak: function(utterance) {
        var text = (typeof utterance === 'string') ? utterance : (utterance.text || '');
        if (text) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'TTS_SPEAK',
            text: text,
            lang: (utterance && utterance.lang) ? utterance.lang : 'en-US',
            rate: (utterance && utterance.rate) ? utterance.rate : 1
          }));
        }
      },
      cancel: function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'TTS_STOP' }));
      },
      speaking: false,
      pending: false,
      paused: false
    };
    window.SpeechSynthesisUtterance = function(text) {
      this.text = text || '';
      this.lang = '';
      this.rate = 1;
      this.pitch = 1;
      this.volume = 1;
    };
    console.log('TTS Bridge (React Native) activo');
  }
})();
true;
`;
