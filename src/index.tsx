import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { colors } from 'styles';

import { AppProvider } from 'hooks';

import { Routes } from './navigation';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.gray[900]}
        />
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}
