import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar, LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from 'react-query';
import OneSignal from 'react-native-onesignal';

import { colors } from 'styles';

import { AppProvider } from 'hooks';
import { navigationRef } from './navigation/navigate';

import { Routes } from './navigation';

LogBox.ignoreLogs(['Remote debugger is in']);

export default function App(): JSX.Element {
  const queryClient = new QueryClient();

  useEffect(() => {
    // if (Platform.OS === 'android') {
    OneSignal.setAppId('e49de3b9-9f90-4a03-a503-fe45126e8ba0');
    // }
  }, []);

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
