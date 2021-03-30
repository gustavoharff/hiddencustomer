import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Administration, UserForm } from 'screens';
import { BackHeaderIcon } from 'components';

const { Navigator, Screen } = createStackNavigator();

export function AdministrationRoutes() {
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
        name="Administration"
        component={Administration}
        options={{
          headerTitle: 'Administração',
        }}
      />

      <Screen
        name="UserForm"
        component={UserForm}
        options={({ navigation }) => ({
          headerTitle: 'Cadastrar usuário',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Navigator>
  );
}
