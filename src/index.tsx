import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './navigation';

import { AppProvider } from './hooks';

export default function App(): JSX.Element {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#1B1B1F" />
        <Routes />
      </NavigationContainer>
    </AppProvider>
  );
}
