import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.0.6:3000/register', {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        setMessage('User registered successfully');
        // Redirigir al usuario a la pantalla de inicio de sesión después de un registro exitoso
        navigation.navigate('LoginScreen');
      } else {
        setMessage('Hubo un problema al registrarse');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Hubo un problema al registrarse');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <TextInput
        style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Username"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Email"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
