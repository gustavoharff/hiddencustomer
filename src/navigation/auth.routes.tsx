import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { SignIn, ForgotPassword, ResetPassword } from 'screens';

import { COLORS, SPACING } from 'styles';
import { HeaderIcon } from 'components';

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
      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({ navigation }) => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#1B1B1F',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerShown: true,
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ResetPassword"
        component={ResetPassword}
        options={({ navigation }) => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#1B1B1F',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerShown: true,
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />
    </Navigator>
  );
}
