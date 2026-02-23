import { useCallback, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import * as Speech from 'expo-speech';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WEB_URL } from './config';
import { TTS_BRIDGE_INJECTION } from './ttsBridge';

interface TTSMessage {
  type: 'TTS_SPEAK' | 'TTS_STOP';
  text?: string;
  lang?: string;
  rate?: number;
}

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    async function configureNavigationBar() {
      await NavigationBar.setVisibilityAsync('hidden');
      await NavigationBar.setBehaviorAsync('overlay-swipe');
    }
    configureNavigationBar();
  }, []);

  const handleMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    try {
      const msg: TTSMessage = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'TTS_SPEAK' && msg.text) {
        Speech.stop();
        Speech.speak(msg.text, {
          language: msg.lang || 'en-US',
          rate: msg.rate ?? 1,
        });
      } else if (msg.type === 'TTS_STOP') {
        Speech.stop();
      }
    } catch {
      // Ignore malformed messages
    }
  }, []);

  const handleLoadEnd = useCallback(() => {
    // Inyectar tras cargar la página (como onPageFinished en Android)
    webViewRef.current?.injectJavaScript(TTS_BRIDGE_INJECTION);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        onMessage={handleMessage}
        onLoadEnd={handleLoadEnd}
      />
      <StatusBar style="light" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});
