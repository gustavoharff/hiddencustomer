import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from 'react-query';

import { colors } from 'styles';

import { AppProvider } from 'hooks';
import { navigationRef } from './navigation/navigate';

import { Routes } from './navigation';

LogBox.ignoreLogs(['Remote debugger is in']);

export default function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <AppProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.gray[900]}
          />
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
