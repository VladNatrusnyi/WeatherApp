import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface LocationSelectorProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedCity, setSelectedCity }) => {
  const cities = ['Kyiv', 'London', 'Paris', 'New York', 'Tokyo'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your city:</Text>
      <View style={styles.cityList}>
        {cities.map((city) => (
          <Button
            key={city}
            mode={selectedCity === city ? 'contained' : 'outlined'}
            onPress={() => setSelectedCity(city)}
            style={styles.cityButton}
          >
            {city}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  cityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cityButton: {
    margin: 5,
  },
});

export default LocationSelector;
