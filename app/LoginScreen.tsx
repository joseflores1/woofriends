import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.6:3000/login', {
        username,
        password,
      });
      if (response.status === 200) {
        setMessage('Login successful');
        setUser(response.data.user); // Almacena el usuario en el contexto de autenticación
        router.push('/(tabs)/SwipeTab'); // Redirige a la pestaña de Swipe
      } else {
        setMessage('Hubo un problema al iniciar sesión');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Hubo un problema al iniciar sesión');
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Username"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Password"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
});
