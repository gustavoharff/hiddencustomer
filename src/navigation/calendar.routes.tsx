import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Calendar } from 'screens';

const { Navigator, Screen } = createStackNavigator();

export function CalendarRoutes() {
  return (
    <Navigator
      mode="modal"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: '#ffff',
        },
        headerTitleAlign: 'left',
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          height: 100,
          backgroundColor: '#1B1B1F',
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
