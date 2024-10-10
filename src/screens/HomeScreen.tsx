import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LocationSelector from '../components/LocationSelector.tsx';
import {useDispatch} from 'react-redux';
import { setIsCitySelected, setLocation} from '../store/locationSlice.ts';

type RootStackParamList = {
  Home: undefined;
  Weather: { location: string; };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('Kyiv');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setLocation(`${latitude},${longitude}`));
        setLoading(false);
        setPermissionDenied(false);
        dispatch(setIsCitySelected(false));
        navigation.replace('Weather', { location: `${latitude},${longitude}` });
      },
      (error) => {
        console.log('Геолокацію не вдалося отримати', error.message);
        setLoading(false);
        setPermissionDenied(true);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [dispatch, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
        <Text>Getting Location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {permissionDenied ? (
        <>
          <Text style={styles.infoText}>Location not found or permission denied</Text>
          <LocationSelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
          <Button
            mode="contained"
            onPress={() => {
              dispatch(setIsCitySelected(true));
              navigation.navigate('Weather', { location: selectedCity })}
            }
            style={styles.button}
          >
            Get Weather
          </Button>
        </>
      ) : (
        <Text style={styles.infoText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
