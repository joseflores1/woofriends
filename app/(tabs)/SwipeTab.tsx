import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const { height } = Dimensions.get('window');
const CARD_WIDTH = 350;
const CARD_HEIGHT = 500;
const SWIPE_THRESHOLD = 120;
const OPACITY_THRESHOLD = 40;

const fetchDogs = async (userId) => {
  try {
    const response = await axios.get(`http://192.168.0.6:3000/dogs/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default function SwipeTab() {
  const [dogs, setDogs] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    const loadDogs = async () => {
      const fetchedDogs = await fetchDogs(user?.id);
      setDogs(fetchedDogs);
    };
    loadDogs();
  }, [user]);

  const resetCardPosition = () => {
    'worklet';
    translateX.value = withSpring(0);
    rotateZ.value = withSpring(0);
  };

  const updateDogIndex = () => {
    setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
    resetCardPosition();
  };

  const saveFavoriteDog = async (dogId) => {
    try {
      await axios.post('http://192.168.0.6:3000/favorites', {
        userId: user?.id,
        dogId: dogId,
      });
      setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
      resetCardPosition();
    } catch (error) {
      console.error('Error saving favorite dog:', error);
    }
  };

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
      rotateZ.value = event.translationX / 20;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        if (translateX.value > 0) {
          runOnJS(saveFavoriteDog)(dogs[currentDogIndex].id);
        } else {
          runOnJS(updateDogIndex)();
        }
      } else {
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -OPACITY_THRESHOLD ? 1 : 0,
  }));

  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > OPACITY_THRESHOLD ? 1 : 0,
  }));

  if (dogs.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No dogs available.</Text>
      </View>
    );
  }

  const currentDog = dogs[currentDogIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image source={{ uri: currentDog.image_path }} style={styles.image} />
            <Animated.View style={[styles.indicator, styles.indicatorLeft, leftIndicatorStyle]}>
              <Text style={styles.indicatorText}>X</Text>
            </Animated.View>
            <Animated.View style={[styles.indicator, styles.indicatorRight, rightIndicatorStyle]}>
              <Text style={styles.indicatorText}>✔</Text>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <View style={[styles.infoContainer, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Nombre:</Text> {currentDog.nombre}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Sexo:</Text> {currentDog.sexo}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Edad:</Text> {currentDog.edad}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Colores:</Text> {currentDog.colors}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Tipo:</Text> {currentDog.tipo}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Personalidad con personas:</Text> {currentDog.personalidad_personas}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Carácter:</Text> {currentDog.carácter}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Nivel de energía:</Text> {currentDog.nivel_energia}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Esterilizado:</Text> {currentDog.esterilizado}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Vacunas:</Text> {currentDog.vacunas}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Personalidad con otros perros:</Text> {currentDog.personalidad_perros}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Tamaño:</Text> {currentDog.tamaño}.
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Relación:</Text> {currentDog.relacion}.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    marginTop: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    top: 20,
    padding: 10,
    borderRadius: 50,
  },
  indicatorLeft: {
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  },
  indicatorRight: {
    left: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
  },
  indicatorText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: CARD_WIDTH,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});
