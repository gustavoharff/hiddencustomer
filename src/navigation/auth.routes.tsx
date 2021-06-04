import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { SignIn, ForgotPassword, ResetPassword, HeaderIcon } from 'components';

import { colors, SPACING } from 'styles';

import { DEFAULT } from './helper';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(): JSX.Element {
  return (
    <Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.gray[900],
        },
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      />

      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({ navigation }) => ({
          ...DEFAULT,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: true,
          headerTitle: 'Esqueci minha senha',
          headerLeft: () => (
            <HeaderIcon
              name="close"
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
          ...DEFAULT,
          headerShown: true,
          headerTitle: 'Redefinir senha',
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
