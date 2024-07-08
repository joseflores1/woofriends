import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function ProfileTab() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
        <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          Debes iniciar sesión para ver tu perfil.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
        Username: {user.username}
      </Text>
      <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
        Email: {user.email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000', // Cambia el color del texto
  },
  message: {
    fontSize: 16,
    color: 'red',
  },
});
