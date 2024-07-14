import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';

export default function GestureHandlerRootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}