import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import {PaperProvider, Switch} from 'react-native-paper';
import useThemePreferences from '../hooks/useThemePreferences';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';

export type RootStackParamList = {
  Home: undefined;
  Weather: { location: string | null };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isDarkTheme, theme, toggleTheme } = useThemePreferences();

  const ThemeSwitch: React.FC = () => (
    <View style={{ marginRight: 10 }}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: theme.colors.text,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerRight: () => <ThemeSwitch />,
            }}
          />
          <Stack.Screen
            name="Weather"
            component={WeatherScreen}
            options={{
              title: 'Weather App',
              headerRight: () => <ThemeSwitch />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigator;

