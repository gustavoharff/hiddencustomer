import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from 'screens';

import { COLORS } from 'styles';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);

export { AuthRoutes };
