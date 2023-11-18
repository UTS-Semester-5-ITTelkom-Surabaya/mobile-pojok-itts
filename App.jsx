import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { WelcomeScreen, ArticlesScreen, ArticleDetailScreen } from './screens';
import { BackButton } from './components';

const Stack = createNativeStackNavigator();

const CharterRegular = require('./assets/fonts/Charter-Regular.otf');
const CharterBold = require('./assets/fonts/Charter-Bold.otf');

export default function App() {
  const [fontsLoaded] = useFonts({
    'Charter-Regular': CharterRegular,
    'Charter-Bold': CharterBold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }

  SplashScreen.hideAsync();

  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#d4af37' },
    headerTitleStyle: { fontFamily: 'Charter-Bold', color: 'white' },
    headerLeft: BackButton,
  };

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Articles"
            component={ArticlesScreen}
            options={{
              title: 'Articles',
            }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetailScreen}
            options={{
              title: 'Article Detail',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
