import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { useGetWeatherQuery } from '../store/weatherApi';
import { ForecastDay } from '../types/weather';
import DetailedWeatherCard from '../components/DetailedWeatherCard';
import WeatherDetailsList from '../components/WeatherDetailsList';
import WeatherDetailsModal from '../components/WeatherDetailsModal';
import TabsNavigator from '../components/TabsNavigator';
import { RootStackParamList } from '../navigation/RootNavigator';
import { SerializedError } from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

interface WeatherScreenProps {
  route: WeatherScreenRouteProp;
}

const WeatherScreen: React.FC<WeatherScreenProps> = ({ route }) => {
  const { location } = route.params;
  const [days, setDays] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  const { data, error, isLoading, refetch } = useGetWeatherQuery({ location, days });

  const showModal = (day: ForecastDay) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
    if (!error) return 'An unknown error occurred.';
    if ('status' in error) {
      return `Error ${error.status}: ${JSON.stringify(error.data)}`;
    }
    return error.message || 'An unknown error occurred.';
  };

  if (isLoading) return <Text style={styles.infoText}>Loading weather data...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.location}>Location: {location}</Text>
      <TabsNavigator days={days} setDays={setDays} />

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.infoText}>{getErrorMessage(error)}</Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Try Again
          </Button>
        </View>
      ) : !data ? (
        <Text style={styles.infoText}>No weather data available</Text>
      ) : (
        <ScrollView>
          {days === 1 ? (
            <DetailedWeatherCard selectedDay={data.forecast.forecastday[0]} />
          ) : (
            <WeatherDetailsList forecastDays={data.forecast.forecastday} showModal={showModal} />
          )}
        </ScrollView>
      )}

      <WeatherDetailsModal visible={modalVisible} hideModal={hideModal} selectedDay={selectedDay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  location: {
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  retryButton: {
    marginTop: 10,
  },
});

export default WeatherScreen;
