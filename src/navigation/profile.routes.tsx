import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  Profile,
  Configuration,
  ChangeUserInfo,
  ChangeUserPassword,
} from 'screens';

import { HeaderIcon } from 'components';

import { SPACING, colors } from 'styles';

const { Navigator, Screen } = createStackNavigator();

export function ProfileRoutes(): JSX.Element {
  return (
    <Navigator
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
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Meu perfil',
          headerRight: () => (
            <HeaderIcon
              name="cog-outline"
              onPress={() => {
                navigation.navigate('Configuration');
              }}
              style={{ marginRight: SPACING.L }}
            />
          ),
        })}
      />

      <Screen
        name="Configuration"
        component={Configuration}
        options={({ navigation }) => ({
          headerTitle: 'Configurações',
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
        name="ChangeUserInfo"
        component={ChangeUserInfo}
        options={({ navigation }) => ({
          headerTitle: 'Alterar dados do perfil',
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
        name="ChangeUserPassword"
        component={ChangeUserPassword}
        options={({ navigation }) => ({
          headerTitle: 'Alterar senha',
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
