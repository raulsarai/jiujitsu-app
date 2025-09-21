// path: src/screens/EvolutionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function EvolutionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Evolução</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: 'white', fontSize: 20 },
});