import React from 'react';
import { Text } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Customers, CustomerForm, CustomerChange } from 'screens';

import { useCustomers } from 'hooks';

import { BackHeaderIcon } from 'components';

const { Navigator, Screen } = createStackNavigator();

export function CustomersRoutes() {
  const { customers } = useCustomers();

  return (
    <Navigator
      mode="modal"
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
        name="Customers"
        component={Customers}
        options={{
          headerTitle: 'Clientes',
          headerRight: () => (
            <Text style={{ color: '#7A7A80', marginRight: 20 }}>
              {customers.length} cliente(s)
            </Text>
          ),
        }}
      />

      <Screen
        name="CustomerForm"
        component={CustomerForm}
        options={({ navigation }) => ({
          headerTitle: 'Registrar cliente',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.navigate('Customers')} />
          ),
        })}
      />

      <Screen
        name="CustomerChange"
        component={CustomerChange}
        options={({ navigation }) => ({
          headerTitle: 'Editar cliente',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Navigator>
  );
}
