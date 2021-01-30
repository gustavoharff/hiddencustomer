import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#191622' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);

export default AuthRoutes;
