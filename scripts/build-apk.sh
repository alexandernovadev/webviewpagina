#!/bin/bash
# Build APK - requiere Node 20+ y JDK de Android Studio (no GraalVM)
set -e

export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"

# Usar Node 20 si nvm está disponible
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
  nvm use 20 2>/dev/null || nvm use 22 2>/dev/null || true
fi

cd "$(dirname "$0")/.."
cd android && ./gradlew assembleRelease

echo ""
echo "✅ APK generado en:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
