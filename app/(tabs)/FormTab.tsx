import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Menu, Provider, Button as PaperButton } from 'react-native-paper';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const FormTab = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [sexo, setSexo] = useState('');
  const [visibleSexo, setVisibleSexo] = useState(false);

  const [color, setColor] = useState('');
  const [visibleColor, setVisibleColor] = useState(false);

  const [tipo, setTipo] = useState('');
  const [visibleTipo, setVisibleTipo] = useState(false);

  const [personalidadPersonas, setPersonalidadPersonas] = useState('');
  const [visiblePersonalidadPersonas, setVisiblePersonalidadPersonas] = useState(false);

  const [carácter, setCarácter] = useState('');
  const [visibleCarácter, setVisibleCarácter] = useState(false);

  const [nivelEnergia, setNivelEnergia] = useState('');
  const [visibleNivelEnergia, setVisibleNivelEnergia] = useState(false);

  const [esterilizado, setEsterilizado] = useState('');
  const [visibleEsterilizado, setVisibleEsterilizado] = useState(false);

  const [vacunas, setVacunas] = useState('');
  const [visibleVacunas, setVisibleVacunas] = useState(false);

  const [personalidadPerros, setPersonalidadPerros] = useState('');
  const [visiblePersonalidadPerros, setVisiblePersonalidadPerros] = useState(false);

  const [tamaño, setTamaño] = useState('');
  const [visibleTamaño, setVisibleTamaño] = useState(false);

  const handleSave = async () => {
    try {
      await axios.post('http://192.168.0.6:3000/preferences', {
        userId,
        sexo,
        color,
        tipo,
        personalidad_personas: personalidadPersonas,
        carácter,
        nivel_energia: nivelEnergia,
        esterilizado,
        vacunas,
        personalidad_perros: personalidadPerros,
        tamaño,
      });
      alert('Preferencias guardadas correctamente');
    } catch (error) {
      console.error('Error guardando preferencias:', error);
      alert('Hubo un problema al guardar las preferencias');
    }
  };

  const renderMenu = (label, value, setValue, visible, setVisible, options) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <PaperButton mode="outlined" onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>{value || 'Seleccione una opción'}</Text>
          </PaperButton>
        }
      >
        {options.map(option => (
          <Menu.Item key={option} onPress={() => { setValue(option); setVisible(false); }} title={option} />
        ))}
      </Menu>
    </View>
  );

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>¿Cómo es tu perrito soñado?</Text>
        {renderMenu('Sexo', sexo, setSexo, visibleSexo, setVisibleSexo, ['Macho', 'Hembra'])}
        {renderMenu('Color', color, setColor, visibleColor, setVisibleColor, ['Negro', 'Café', 'Rubio', 'Blanco'])}
        {renderMenu('Tipo', tipo, setTipo, visibleTipo, setVisibleTipo, ['Senior', 'Adulto', 'Cachorro'])}
        {renderMenu('Personalidad con personas', personalidadPersonas, setPersonalidadPersonas, visiblePersonalidadPersonas, setVisiblePersonalidadPersonas, ['Cariñoso', 'Tímido', 'Normal'])}
        {renderMenu('Carácter', carácter, setCarácter, visibleCarácter, setVisibleCarácter, ['Juguetón', 'Tranquilo', 'Asustadizo', 'Guardián'])}
        {renderMenu('Nivel de energía', nivelEnergia, setNivelEnergia, visibleNivelEnergia, setVisibleNivelEnergia, ['Bajo', 'Medio-Bajo', 'Medio', 'Medio-Alto', 'Alto'])}
        {renderMenu('Esterilizado', esterilizado, setEsterilizado, visibleEsterilizado, setVisibleEsterilizado, ['Sí', 'No', 'Consultar'])}
        {renderMenu('Vacunas', vacunas, setVacunas, visibleVacunas, setVisibleVacunas, ['Sí', 'No', 'Consultar'])}
        {renderMenu('Personalidad con perros', personalidadPerros, setPersonalidadPerros, visiblePersonalidadPerros, setVisiblePersonalidadPerros, ['Sociable', 'Selectiva', 'Solitaria'])}
        {renderMenu('Tamaño', tamaño, setTamaño, visibleTamaño, setVisibleTamaño, ['Grande', 'Mediano', 'Pequeño'])}
        <View style={styles.buttonContainer}>
          <PaperButton mode="contained" onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar Configuración</Text>
          </PaperButton>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40, // Para asegurarse de que el botón no esté demasiado cerca del final
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  buttonText: {
    color: '#00BFFF', // Celeste
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40, // Para asegurarse de que el botón no esté demasiado cerca del final
  },
  saveButton: {
    backgroundColor: '#00BFFF', // Color celeste de fondo
    borderRadius: 8, // Para un borde redondeado
  },
  saveButtonText: {
    color: '#fff', // Letra blanca
  },
});

export default FormTab;
