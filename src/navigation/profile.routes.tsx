import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from 'screens';

import { LoggoutHeaderIcon } from 'components';

import { useAuth } from 'hooks';

const { Navigator, Screen } = createStackNavigator();

export function ProfileRoutes() {
  const { signOut } = useAuth();

  return (
    <Navigator
      screenOptions={{
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
        options={{
          headerTitle: 'Meu perfil',
          headerRight: () => <LoggoutHeaderIcon onPress={signOut} />,
        }}
      />
    </Navigator>
  );
}
