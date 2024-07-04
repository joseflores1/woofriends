import React, { useState } from 'react';
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

const { height } = Dimensions.get('window');
const CARD_WIDTH = 350;
const CARD_HEIGHT = 500;
const SWIPE_THRESHOLD = 120;
const INDICATOR_THRESHOLD = 20;  // Haciendo los indicadores más sensibles

const dogs = [
  {
    image: require('@/assets/images/perro.png'),
    name: 'Fantasma',
    sexo: 'Hembra',
    edad: 10,
    tamaño: 'Grande',
    personalidad: 'Sociable-Juguetona',
    esterilizado: 'Sí',
    vacunas: 'No',
    espacio: 'Patio',
    relacion: 'Ninguna',
  },
  {
    image: require('@/assets/images/perro2.png'),
    name: 'Nico',
    sexo: 'Macho',
    edad: 12,
    tamaño: 'Grande',
    personalidad: 'Sociable-Tranquilo',
    esterilizado: 'Sí',
    vacunas: 'Sí',
    espacio: 'Patio Grande',
    relacion: 'Chispita',
  },
];

export default function SwipeTab() {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const colorScheme = useColorScheme();
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const showIndicators = useSharedValue(false);

  const resetCardPosition = () => {
    translateX.value = withSpring(0);
    rotateZ.value = withSpring(0);
    showIndicators.value = false;
  };

  const updateDogIndex = () => {
    const newIndex = (currentDogIndex + 1) % dogs.length;
    setCurrentDogIndex(newIndex);
    runOnJS(resetCardPosition)();
  };

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      showIndicators.value = true;
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      rotateZ.value = event.translationX / 20;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        runOnJS(updateDogIndex)();
      } else {
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
      showIndicators.value = false;
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: showIndicators.value && translateX.value < -INDICATOR_THRESHOLD ? Math.min(Math.abs(translateX.value) / SWIPE_THRESHOLD, 1) : 0,
  }));

  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: showIndicators.value && translateX.value > INDICATOR_THRESHOLD ? Math.min(translateX.value / SWIPE_THRESHOLD, 1) : 0,
  }));

  const currentDog = dogs[currentDogIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image source={currentDog.image} style={styles.image} />
            <Animated.View style={[styles.indicator, styles.indicatorLeft, leftIndicatorStyle]}>
              <Text style={styles.indicatorText}>X</Text>
            </Animated.View>
            <Animated.View style={[styles.indicator, styles.indicatorRight, rightIndicatorStyle]}>
              <Text style={styles.indicatorText}>✔</Text>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Nombre:</Text> {currentDog.name}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Sexo:</Text> {currentDog.sexo}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Edad:</Text> {currentDog.edad}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Tamaño:</Text> {currentDog.tamaño}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Personalidad:</Text> {currentDog.personalidad}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Esterilizado:</Text> {currentDog.esterilizado}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Vacunas:</Text> {currentDog.vacunas}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Espacio:</Text> {currentDog.espacio}
          </Text>
          <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            <Text style={styles.infoLabel}>Relación:</Text> {currentDog.relacion}
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
    marginTop: 50,
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
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

