import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import { ConditionType, Weather } from './Weather';

export interface IWeather {
  temperature: number;
  condition: ConditionType;
}

const API_KEY = '5c4ba1c8c300b7666fa5f4771a058f5c';
export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<IWeather>({ temperature: 0, condition: 'Clear' });

  const getWeather = async (lat: number, lon: number) => {
    try {
      const { data: { main, weather } } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );

      setWeather(prev => ({
        ...prev,
        temperature: Math.round(main.temp),
        condition: weather[0].main,
      }));
    } catch (error) {
      console.log(error, 'here');
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
        if (latitude && longitude) {
          await getWeather(latitude, longitude);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        Alert.alert(`Не могу определить местоположение`, `2 параметр`);
      }
    })();

  }, [])

  return (
    isLoading ? <Loading /> :
      <Weather
        temperature={weather.temperature}
        condition={weather.condition}
      />
  );
}