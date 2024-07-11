import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const FindDogsTab = () => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const colorScheme = useColorScheme();
  const { user } = useAuth();  // Obtener el usuario autenticado

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('http://192.168.0.6:3000/dogs');
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, [user]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredDogs(dogs);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = dogs.filter(dog => {
        return Object.keys(dog).some(key =>
          dog[key].toString().toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredDogs(filteredData);
    }
  }, [searchTerm, dogs]);

  const renderDogItem = ({ item }) => (
    <TouchableOpacity style={styles.dogItem} onPress={() => setSelectedDog(item)}>
      <Image source={{ uri: item.image_path }} style={styles.dogImage} />
      <Text style={[styles.dogName, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <TextInput
        style={[styles.searchInput, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Buscar por color, tamaño, nombre..."
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredDogs}
        renderItem={renderDogItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.dogList}
      />
      {selectedDog && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedDog}
          onRequestClose={() => setSelectedDog(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedDog.image_path }} style={styles.modalImage} />
              <Text style={styles.modalText}>Nombre: {selectedDog.nombre}.</Text>
              <Text style={styles.modalText}>Sexo: {selectedDog.sexo}.</Text>
              <Text style={styles.modalText}>Edad: {selectedDog.edad}.</Text>
              <Text style={styles.modalText}>Color: {selectedDog.colors}.</Text>
              <Text style={styles.modalText}>Tipo: {selectedDog.tipo}.</Text>
              <Text style={styles.modalText}>Personalidad con personas: {selectedDog.personalidad_personas}.</Text>
              <Text style={styles.modalText}>Carácter: {selectedDog.carácter}.</Text>
              <Text style={styles.modalText}>Nivel de energía: {selectedDog.nivel_energia}.</Text>
              <Text style={styles.modalText}>Esterilizado: {selectedDog.esterilizado}.</Text>
              <Text style={styles.modalText}>Vacunas: {selectedDog.vacunas}.</Text>
              <Text style={styles.modalText}>Personalidad con perros: {selectedDog.personalidad_perros}.</Text>
              <Text style={styles.modalText}>Tamaño: {selectedDog.tamaño}.</Text>
              <Text style={styles.modalText}>Relación: {selectedDog.relacion}.</Text>
              <TouchableOpacity onPress={() => setSelectedDog(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dogList: {
    alignItems: 'center',
  },
  dogItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dogImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dogName: {
    marginTop: 10,
    fontSize: 16,
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

export default FindDogsTab;
