import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBarIcon } from 'components';

import { useAuth } from 'hooks';

import { ReleasesStack } from './releases.routes';
import { CustomersRoutes } from './customers.routes';
import { ProfileRoutes } from './profile.routes';
import { AdministrationRoutes } from './administration.routes';
import { CalendarRoutes } from './calendar.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes(): JSX.Element {
  const { user } = useAuth();

  return (
    <Navigator
      screenOptions={{ tabBarLabel: () => null }}
      initialRouteName="Releases"
    >
      <Screen
        name="Releases"
        component={ReleasesStack}
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

      <Screen
        name="Customers"
        component={CustomersRoutes}
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

      <Screen
        name="Calendar"
        component={CalendarRoutes}
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
        <Screen
          name="Administration"
          component={AdministrationRoutes}
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

      <Screen
        name="Profile"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon name="account-outline" size={size} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
}
