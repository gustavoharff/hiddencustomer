import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { colors } from 'styles';

import { AppProvider } from 'hooks';

import { Routes } from './navigation';

LogBox.ignoreLogs(['Remote debugger is in']);

export default function App(): JSX.Element {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.gray[900]}
        />
        <Routes />
      </NavigationContainer>
    </AppProvider>
  );
}
