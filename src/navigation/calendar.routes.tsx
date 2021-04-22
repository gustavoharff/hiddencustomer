import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Calendar } from 'screens';

import { colors } from 'styles';

const { Navigator, Screen } = createStackNavigator();

export function CalendarRoutes(): JSX.Element {
  return (
    <Navigator
      mode="modal"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerTitleAlign: 'left',
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          height: 100,
          backgroundColor: colors.gray[900],
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: 'Calendário',
        }}
      />
    </Navigator>
  );
}
