import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Customers, CustomerForm } from 'screens';

import { HeaderIcon } from 'components';

import { SPACING, colors } from 'styles';

const { Navigator, Screen } = createStackNavigator();

export function CustomersRoutes(): JSX.Element {
  return (
    <Navigator
      mode="modal"
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
        name="Customers"
        component={Customers}
        options={{
          headerTitle: 'Clientes',
        }}
      />

      <Screen
        name="CustomerForm"
        component={CustomerForm}
        options={({ navigation }) => ({
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
    </Navigator>
  );
}
