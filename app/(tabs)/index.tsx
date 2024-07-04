import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={Platform.OS === 'web' ? styles.webBackground : styles.background}>
      {Platform.OS !== 'web' && (
        <ImageBackground source={require('@/assets/images/splash.png')} style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.description}>
                Al presionar “Registrarse” o “Iniciar sesión” aceptas nuestros{' '}
                <Text style={styles.link} onPress={() => {}}>Términos</Text>. Para más información vea nuestra{' '}
                <Text style={styles.link} onPress={() => {}}>Política de privacidad</Text> y{' '}
                <Text style={styles.link} onPress={() => {}}>Política de cookies</Text>.
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      )}
      {Platform.OS === 'web' && (
        <View style={styles.webContainer}>
          <Text style={styles.titleWeb}>WooFriends</Text>
          <Image source={require('@/assets/images/logo.png')} style={styles.logoWeb} />
          <View style={styles.contentWeb}>
            <Text style={styles.description}>
              Al presionar “Registrarse” o “Iniciar sesión” aceptas nuestros{' '}
              <Text style={styles.link} onPress={() => {}}>Términos</Text>. Para más información vea nuestra{' '}
              <Text style={styles.link} onPress={() => {}}>Política de privacidad</Text> y{' '}
              <Text style={styles.link} onPress={() => {}}>Política de cookies</Text>.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5EFE4', // Color de fondo para la versión web
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoContainerWeb: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWeb: {
    alignItems: 'center',
    paddingBottom: 50,
    marginTop: 50, // Espacio adicional para separar el logo del contenido
  },
  description: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    ...(Platform.OS === 'web' && {
      textAlign: 'left',
      marginHorizontal: 0,
    }),
  },
  link: {
    color: '#0a7ea4',
    textDecorationLine: 'underline',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer', // Añadir cursor pointer para hover en web
    }),
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      marginHorizontal: 10,
      cursor: 'pointer', // Añadir cursor pointer para hover en web
      transition: 'background-color 0.3s', // Efecto de transición para hover
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoWeb: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWeb: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
