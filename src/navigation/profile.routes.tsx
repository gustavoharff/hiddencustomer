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

import { BackHeaderIcon, ConfigHeaderIcon } from 'components';

const { Navigator, Screen } = createStackNavigator();

export function ProfileRoutes() {
  return (
    <Navigator
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
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Meu perfil',
          headerRight: () => (
            <ConfigHeaderIcon
              onPress={() => {
                navigation.navigate('Configuration');
              }}
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
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <Screen
        name="ChangeUserInfo"
        component={ChangeUserInfo}
        options={({ navigation }) => ({
          headerTitle: 'Alterar dados do perfil',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <Screen
        name="ChangeUserPassword"
        component={ChangeUserPassword}
        options={({ navigation }) => ({
          headerTitle: 'Alterar senha',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Navigator>
  );
}
