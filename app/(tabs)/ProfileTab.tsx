import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface Dog {
  id: number;
  nombre: string;
  sexo: string;
  edad: number;
  colors: string;
  tipo: string;
  personalidad_personas: string;
  carácter: string;
  nivel_energia: string;
  esterilizado: string;
  vacunas: string;
  personalidad_perros: string;
  tamaño: string;
  relacion: string;
  image_path: string;
}

export default function ProfileTab() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      try {
        const response = await axios.get(`http://192.168.0.6:3000/favorites/${user?.id}`);
        setFavoriteDogs(response.data);
      } catch (error) {
        console.error('Error fetching favorite dogs:', error);
      }
    };

    fetchFavoriteDogs();
  }, [user]);

  const renderDogItem = ({ item }: { item: Dog }) => (
    <TouchableOpacity style={[styles.dogItem, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f5f5f5' }]} onPress={() => setSelectedDog(item)}>
      <Image source={{ uri: item.image_path }} style={styles.dogImage} />
      <View style={styles.dogInfo}>
        <Text style={[styles.dogName, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.nombre}</Text>
        <Text style={[styles.dogDetails, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.edad} años, {item.tamaño}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderModalContent = (dog: Dog) => (
    <View style={styles.modalContent}>
      <Image source={{ uri: dog.image_path }} style={styles.modalImage} />
      <Text style={styles.modalText}>Nombre: {dog.nombre}.</Text>
      <Text style={styles.modalText}>Sexo: {dog.sexo}.</Text>
      <Text style={styles.modalText}>Edad: {dog.edad}.</Text>
      <Text style={styles.modalText}>Color: {dog.colors}.</Text>
      <Text style={styles.modalText}>Tipo: {dog.tipo}.</Text>
      <Text style={styles.modalText}>Personalidad con personas: {dog.personalidad_personas}.</Text>
      <Text style={styles.modalText}>Carácter: {dog.carácter}.</Text>
      <Text style={styles.modalText}>Nivel de energía: {dog.nivel_energia}.</Text>
      <Text style={styles.modalText}>Esterilizado: {dog.esterilizado}.</Text>
      <Text style={styles.modalText}>Vacunas: {dog.vacunas}.</Text>
      <Text style={styles.modalText}>Personalidad con perros: {dog.personalidad_perros}.</Text>
      <Text style={styles.modalText}>Tamaño: {dog.tamaño}.</Text>
      <Text style={styles.modalText}>Relación: {dog.relacion}.</Text>
      <TouchableOpacity onPress={() => setSelectedDog(null)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      {user ? (
        <>
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Usuario: {user.username}</Text>
            <Text style={[styles.email, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Email: {user.email}</Text>
          </View>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Tus perritos</Text>
          {favoriteDogs.length > 0 ? (
            <FlatList
              data={favoriteDogs}
              renderItem={renderDogItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.dogList}
            />
          ) : (
            <Text style={[styles.noFavorites, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>No tienes perritos favoritos aún.</Text>
          )}
          {selectedDog && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={!!selectedDog}
              onRequestClose={() => setSelectedDog(null)}
            >
              <View style={styles.modalContainer}>
                {renderModalContent(selectedDog)}
              </View>
            </Modal>
          )}
        </>
      ) : (
        <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Debes iniciar sesión para ver tu perfil.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30, // Ajuste para desplazar el contenido hacia abajo
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dogList: {
    alignItems: 'center',
  },
  dogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    maxWidth: 400,
  },
  dogImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dogInfo: {
    marginLeft: 10,
  },
  dogName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dogDetails: {
    fontSize: 14,
  },
  noFavorites: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
