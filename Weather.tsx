import React, { FC } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export type ConditionType =
  'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Dust' | 'Smoke' | 'Haze' | 'Mist' | 'Clear' | 'Clouds';

export type IconsType =
  'weather-lightning' |
  'weather-rainy' |
  'snowflake' |
  'weather-pouring' |
  'weather-windy' |
  'weather-windy-variant' |
  'weather-fog' |
  'weather-hazy' |
  'weather-cloudy' |
  'weather-sunny';

type WeatherProps = {
  temperature: number;
  condition: ConditionType;
}

type ConditionObjType = {
  iconName: IconsType;
  gradient: [string, string];
  title: string;
  subTitle: string;
}


const weatherOptions: Record<ConditionType, ConditionObjType> = {
  Thunderstorm: {
    iconName: 'weather-lightning',
    gradient: ['#141E30', '#243B55'],
    title: 'Сиди дома',
    subTitle: 'Ты видишь что на улице?',
  },
  Drizzle: {
    iconName: 'weather-rainy',
    gradient: ['#3a7bd5', '#3a6073'],
    title: 'Возьми зонтик',
    subTitle: 'Возможно скоро дождь усилится',
  },
  Rain: {
    iconName: 'weather-pouring',
    gradient: ['#000046', '#1CB5E0'],
    title: 'На улице дождь',
    subTitle: 'А значит скоро будет радуга!',
  },
  Snow: {
    iconName: 'snowflake',
    gradient: ['#83a4d4', '#b6fbff'],
    title: 'На улице снежок!',
    subTitle: 'Одевайтесь потеплее, лепите снеговиков',
  },
  Dust: {
    iconName: 'weather-windy-variant',
    gradient: ['#B79891', '#94716B'],
    title: 'Пыльно',
    subTitle: 'Лучше закройте окна',
  },
  Smoke: {
    iconName: 'weather-windy',
    gradient: ['#56CCF2', '#2F80ED'],
    title: 'На улице смог :(',
    subTitle: 'Не советую выходить без необходимости',
  },
  Haze: {
    iconName: 'weather-hazy',
    gradient: ['#3E5151', '#DECBA4'],
    title: 'На улице снежок!',
    subTitle: 'Одевайтесь потеплее, лепите снеговиков',
  },
  Mist: {
    iconName: 'weather-fog',
    gradient: ['#606c88', '#3f4c6b'],
    title: 'Ни черта не видно в тумане',
    subTitle: 'Зато как в Сайлент-Хилле',
  },
  Clear: {
    iconName: 'weather-sunny',
    gradient: ['#56CCF2', '#2F80ED'],
    title: 'Погода супер',
    subTitle: 'Иди гулять, хватит сидеть дома!',
  },
  Clouds: {
    iconName: 'weather-cloudy',
    gradient: ['#757F9A', '#D7DDE8'],
    title: 'Облака',
    subTitle: 'Ну это да',
  },
}

export const Weather: FC<WeatherProps> = ({ temperature, condition }) => {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={100} color="white" />
        <Text style={styles.temp}>{temperature}°C</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subTitle}>{weatherOptions[condition].subTitle}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  halfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    fontSize: 32,
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 44,
    fontWeight: '300',
    marginBottom: 8,
  },
  subTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
});