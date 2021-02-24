import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Logo,
  BackHeaderIcon,
  MenuHeaderIcon,
  CloseHeaderIcon,
} from 'components';

import { Customers, CustomerForm, CustomerDetails } from 'screens';

import { COLORS, SPACING } from 'styles';

const CustomersNavigator = createStackNavigator();

const CustomersRoutes: React.FC = () => (
  <CustomersNavigator.Navigator
    mode="card"
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <MenuHeaderIcon onPress={() => navigation.toggleDrawer()} />
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <CustomersNavigator.Screen name="Customers" component={Customers} />
    <CustomersNavigator.Screen
      name="CustomerForm"
      component={CustomerForm}
      options={({ navigation }) => ({
        headerLeft: () => (
          <CloseHeaderIcon onPress={() => navigation.navigate('Customers')} />
        ),
      })}
    />

    <CustomersNavigator.Screen
      name="CustomerDetails"
      component={CustomerDetails}
      options={({ navigation }) => ({
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.navigate('Customers')} />
        ),
      })}
    />
  </CustomersNavigator.Navigator>
);

export { CustomersRoutes };
