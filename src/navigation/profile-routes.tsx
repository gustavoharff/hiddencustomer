import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ChangeInfo,
  ChangePassword,
  Configuration,
  HeaderIcon,
  Profile,
} from 'components';

import { SPACING } from 'styles';

import { DEFAULT } from './helper';

const Stack = createStackNavigator();

export function ProfileScreen(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Meu perfil',
          headerRight: () => (
            <HeaderIcon
              name="cog-outline"
              onPress={() => {
                navigation.navigate('ProfileStack', {
                  screen: 'Configuration',
                });
              }}
              style={{ marginRight: SPACING.L }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export function ProfileStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...DEFAULT,
        headerLeft: () => (
          <HeaderIcon
            name="arrow-left"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: SPACING.S }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Configuration"
        component={Configuration}
        options={{
          headerTitle: 'Configurações',
        }}
      />

      <Stack.Screen
        name="ChangeInfo"
        component={ChangeInfo}
        options={{
          headerTitle: 'Alterar dados do perfil',
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: 'Alterar senha',
        }}
      />
    </Stack.Navigator>
  );
}
