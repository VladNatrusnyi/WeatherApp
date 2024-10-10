import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';

interface TabsNavigatorProps {
  days: number;
  setDays: (days: number) => void;
}

const TabsNavigator: React.FC<TabsNavigatorProps> = ({ days, setDays }) => {

  return (
    <View style={styles.tabs}>
      <Button mode={days === 1 ? 'contained' : 'outlined'} onPress={() => setDays(1)}>
        Today
      </Button>
      <Button mode={days === 3 ? 'contained' : 'outlined'} onPress={() => setDays(3)}>
        3 Days
      </Button>
      <Button mode={days === 7 ? 'contained' : 'outlined'} onPress={() => setDays(7)}>
        Week
      </Button>
      <Button mode={days === 14 ? 'contained' : 'outlined'} onPress={() => setDays(14)}>
        14 Days
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
});

export default TabsNavigator;
