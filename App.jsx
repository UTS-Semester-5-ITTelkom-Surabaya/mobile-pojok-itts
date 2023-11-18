import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ArticlesScreen from './screens/ArticlesScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ArticleDetailScreen from './screens/ArticleDetailScreen';

import BackButton from './components/BackButton';

const Stack = createNativeStackNavigator();

export default function App() {
  const renderBackButton = () => <BackButton />;

  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#d4af37' },
    headerTitleStyle: { fontFamily: 'Charter-Bold', color: 'white' },
    headerLeft: renderBackButton,
  };

  return (
    <GluestackUIProvider config={config}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
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
