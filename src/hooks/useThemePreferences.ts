import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const THEME_KEY = 'APP_THEME';

const { LightTheme: PaperLightTheme, DarkTheme: PaperDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CustomLightTheme = {
  ...MD3LightTheme,
  ...PaperLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...PaperLightTheme.colors,
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

type ThemePreferences = {
  isDarkTheme: boolean;
  theme: typeof CustomLightTheme | typeof CustomDarkTheme;
  toggleTheme: () => void;
};

const useThemePreferences = (): ThemePreferences => {
  const systemTheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme === 'light') {
        setIsDarkTheme(false);
      } else if (storedTheme === 'dark') {
        setIsDarkTheme(true);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomLightTheme;

  return { isDarkTheme, theme, toggleTheme };
};

export default useThemePreferences;
