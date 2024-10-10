import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Button } from 'react-native-paper';
import { ForecastDay } from '../types/weather';
import DetailedWeatherCard from './DetailedWeatherCard';

interface WeatherDetailsModalProps {
  visible: boolean;
  hideModal: () => void;
  selectedDay: ForecastDay | null;
}

const WeatherDetailsModal: React.FC<WeatherDetailsModalProps> = ({ visible, hideModal, selectedDay }) => {
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
      {selectedDay && (
        <View>
          <DetailedWeatherCard selectedDay={selectedDay} />
          <Button mode="contained" onPress={hideModal} style={{ marginTop: 20 }}>
            Close
          </Button>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    backgroundColor: 'transparent',
  },
});

export default WeatherDetailsModal;
