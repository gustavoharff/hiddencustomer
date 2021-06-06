import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CustomerForm, Customers, HeaderIcon } from 'components';

import { SPACING } from 'styles';
import { DEFAULT } from './helper';

const Stack = createStackNavigator();

export function CustomersScreen(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Customers"
        component={Customers}
        options={{ headerTitle: 'Clientes' }}
      />
    </Stack.Navigator>
  );
}

export function CustomersStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="CustomerForm"
        component={CustomerForm}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Registrar cliente',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.navigate('Customers')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
