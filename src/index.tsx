import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from 'styles';

import Routes from './navigation';

import { AppProvider } from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor={COLORS.BACKGROUND_DARK}
    />
    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
