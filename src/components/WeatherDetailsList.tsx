import React from 'react';
import { ScrollView } from 'react-native';
import {Avatar, List} from 'react-native-paper';
import { ForecastDay } from '../types/weather';

interface WeatherDetailsListProps {
  forecastDays: ForecastDay[];
  showModal: (day: ForecastDay) => void;
}

const WeatherDetailsList: React.FC<WeatherDetailsListProps> = ({ forecastDays, showModal }) => {
  return (
    <ScrollView style={{paddingHorizontal: 20}}>
      {forecastDays.map((day) => (
        <List.Item
          key={day.date}
          title={day.date}
          description={`Max Temp: ${day.day.maxtemp_c}°C, Min Temp: ${day.day.mintemp_c}°C`}
          left={() => <Avatar.Image
            size={50}
            source={{ uri: `https:${day.day.condition.icon}` }}
          />}
          onPress={() => showModal(day)}
        />
      ))}
    </ScrollView>
  );
};

export default WeatherDetailsList;
