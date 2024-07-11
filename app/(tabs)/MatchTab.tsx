import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme, Dimensions } from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 400;

const MatchTab = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);
    const colorScheme = useColorScheme();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get(`http://192.168.0.6:3000/matches/${user.id}`);
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        if (user) {
            fetchMatches();
        }
    }, [user]);

    const handleImageError = (error) => {
        console.error('Error loading image:', error.nativeEvent.error);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Matches</Text>
            {matches.length > 0 ? (
                matches.map((dog, index) => (
                    <View key={index} style={styles.dogCard}>
                        <Image
                            source={{ uri: dog.image_path }}
                            style={styles.dogImage}
                            onError={handleImageError}
                            resizeMode="cover"
                        />
                        <View style={styles.dogInfo}>
                            <Text style={styles.dogName}>{dog.nombre}</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Sexo: {dog.sexo}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Edad: {dog.edad}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Color: {dog.color}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Tipo: {dog.tipo}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Personalidad con personas: {dog.personalidad_personas}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Carácter: {dog.carácter}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Nivel de energía: {dog.nivel_energia}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Esterilizado: {dog.esterilizado}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Vacunas: {dog.vacunas}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Personalidad con perros: {dog.personalidad_perros}.</Text>
                            <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Tamaño: {dog.tamaño}.</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noMatches}>No se encontraron matches</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#000', // Fondo oscuro para la prueba de visibilidad del texto
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // Color del título blanco para mayor contraste
        marginTop: 20,
    },
    dogCard: {
        backgroundColor: '#fff',
        width: CARD_WIDTH,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'hidden',
    },
    dogImage: {
        width: '100%',
        height: CARD_HEIGHT,
    },
    dogInfo: {
        padding: 10,
        backgroundColor: '#000', // Fondo oscuro para la información del perro
    },
    dogName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff', // Color del nombre blanco para mayor contraste
        marginTop: 10,  
    },
    dogDetails: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff', // Color del texto blanco para mayor contraste
    },
    noMatches: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default MatchTab;
