import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { TabBarIcon, Calendar, Loggout } from 'components';

import { useAuth } from 'hooks';

import { ProfileScreen, ProfileStack } from './profile-routes';

import { ReleasesScreen, ReleasesStack } from './releases-routes';
import { CustomersScreen, CustomersStack } from './customers-routes';
import {
  AdministrationScreen,
  AdministrationStack,
} from './administration-routes';

import { DEFAULT, NO_HEADER } from './helper';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: 'Calendário',
        }}
      />
    </Stack.Navigator>
  );
}

export function TabStack(): JSX.Element {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarLabel: () => null }}
      initialRouteName="Releases"
    >
      <Tab.Screen
        name="Releases"
        component={ReleasesScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="rocket-launch-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="account-group-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="calendar-multiselect"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {user.permission === 'admin' && (
        <Tab.Screen
          name="Administration"
          component={AdministrationScreen}
          options={{
            tabBarIcon: ({ size, focused }) => (
              <TabBarIcon
                name="account-cog-outline"
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon name="account-outline" size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppStack(): JSX.Element {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        ...DEFAULT,
        ...NO_HEADER,
      }}
    >
      <Stack.Screen name="Tab" component={TabStack} />

      <Stack.Screen name="ReleasesStack" component={ReleasesStack} />

      <Stack.Screen name="CustomersStack" component={CustomersStack} />

      <Stack.Screen
        name="AdministrationStack"
        component={AdministrationStack}
      />

      <Stack.Screen name="ProfileStack" component={ProfileStack} />

      <Stack.Screen name="Loggout" component={Loggout} />
    </Stack.Navigator>
  );
}
