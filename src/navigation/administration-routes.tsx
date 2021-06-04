import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Administration, HeaderIcon, UserForm } from 'components';

import { SPACING } from 'styles';

import { DEFAULT } from './helper';

const Stack = createStackNavigator();

export function AdministrationScreen(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Administration"
        component={Administration}
        options={{
          headerTitle: 'Administração',
        }}
      />
    </Stack.Navigator>
  );
}

export function AdministrationStack(): JSX.Element {
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
        name="UserForm"
        component={UserForm}
        options={{
          headerTitle: 'Cadastrar usuário',
        }}
      />
    </Stack.Navigator>
  );
}
