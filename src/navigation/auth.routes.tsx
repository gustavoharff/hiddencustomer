import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { SignIn } from 'screens';

import { COLORS } from 'styles';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(): JSX.Element {
  return (
    <Navigator
      mode="modal"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: COLORS.BACKGROUND_DARK,
        },
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
