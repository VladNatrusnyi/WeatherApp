import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Chip, Avatar } from 'react-native-paper';
import { ForecastDay } from '../types/weather';

interface DetailedWeatherCardProps {
  selectedDay: ForecastDay | null;
}

const DetailedWeatherCard: React.FC<DetailedWeatherCardProps> = ({ selectedDay }) => {
  return (
    <Card style={styles.card}>
      <ScrollView>
        <Card.Title
          title={`Weather on ${selectedDay?.date}`}
          subtitle={`Condition: ${selectedDay?.day.condition.text}`}
          left={(props) => (
            <Avatar.Icon {...props} icon="calendar" color="#fff" style={{ backgroundColor: '#6c63ff' }} />
          )}
        />
        <Card.Content>
          <View style={styles.column}>
            <Chip icon="thermometer" style={styles.chip}>
              Max Temp: {selectedDay?.day.maxtemp_c}°C
            </Chip>
            <Chip icon="thermometer" style={styles.chip}>
              Min Temp: {selectedDay?.day.mintemp_c}°C
            </Chip>
            <Chip icon="water-percent" style={styles.chip}>
              Humidity: {selectedDay?.day.avghumidity}%
            </Chip>
            <Chip icon="weather-windy" style={styles.chip}>
              Wind Speed: {selectedDay?.day.maxwind_kph} kph
            </Chip>
            <Chip icon="weather-sunny" style={styles.chip}>
              UV Index: {selectedDay?.day.uv}
            </Chip>
            <Chip icon="eye" style={styles.chip}>
              Visibility: {selectedDay?.day.avgvis_km} km
            </Chip>
          </View>

          <View style={styles.conditionContainer}>
            <Text style={styles.conditionTitle}>Condition Details:</Text>
            <Text style={styles.conditionText}>{selectedDay?.day.condition.text}</Text>
            <Avatar.Image
              size={64}
              source={{ uri: `https:${selectedDay?.day.condition.icon}` }}
              style={styles.conditionIcon}
            />
          </View>
        </Card.Content>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  chip: {
    marginVertical: 6,
    marginHorizontal: 0,
    justifyContent: 'center',
    width: '100%',
  },
  conditionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  conditionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conditionText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  conditionIcon: {
    marginTop: 15,
  },
});

export default DetailedWeatherCard;
