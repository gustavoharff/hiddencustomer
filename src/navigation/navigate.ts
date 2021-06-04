import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: object): void => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};
