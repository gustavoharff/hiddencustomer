import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenIndicator } from 'components';

import { useAuth } from 'hooks';

import { ReleasesRoutes } from './releases.routes';
import { CustomersRoutes } from './customers.routes';
import { ProfileRoutes } from './profile.routes';
import { AdministrationRoutes } from './administration.routes';
import { CalendarRoutes } from './calendar.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes(): JSX.Element {
  const { user } = useAuth();

  return (
    <Navigator>
      <Screen
        name="Releases"
        component={ReleasesRoutes}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, focused }) => (
            <>
              <Icon
                name="rocket-launch-outline"
                size={size}
                color={focused ? '#DC1637' : '#A8A8B3'}
              />
              {focused && (
                <ScreenIndicator
                  backgroundColor={focused ? '#DC1637' : '#A8A8B3'}
                />
              )}
            </>
          ),
        }}
      />

      <Screen
        name="Customers"
        component={CustomersRoutes}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, focused }) => (
            <>
              <Icon
                name="account-group-outline"
                size={size}
                color={focused ? '#DC1637' : '#A8A8B3'}
              />
              {focused && (
                <ScreenIndicator
                  backgroundColor={focused ? '#DC1637' : '#A8A8B3'}
                />
              )}
            </>
          ),
        }}
      />

      <Screen
        name="Calendar"
        component={CalendarRoutes}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, focused }) => (
            <>
              <Icon
                name="calendar-multiselect"
                size={size}
                color={focused ? '#DC1637' : '#A8A8B3'}
              />
              {focused && (
                <ScreenIndicator
                  backgroundColor={focused ? '#DC1637' : '#A8A8B3'}
                />
              )}
            </>
          ),
        }}
      />

      {user.permission === 'admin' && (
        <Screen
          name="Administration"
          component={AdministrationRoutes}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, focused }) => (
              <>
                <Icon
                  name="account-cog-outline"
                  size={size}
                  color={focused ? '#DC1637' : '#A8A8B3'}
                />
                {focused && (
                  <ScreenIndicator
                    backgroundColor={focused ? '#DC1637' : '#A8A8B3'}
                  />
                )}
              </>
            ),
          }}
        />
      )}

      <Screen
        name="Profile"
        component={ProfileRoutes}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, focused }) => (
            <>
              <Icon
                name="account-outline"
                size={size}
                color={focused ? '#DC1637' : '#A8A8B3'}
              />
              {focused && (
                <ScreenIndicator
                  backgroundColor={focused ? '#DC1637' : '#A8A8B3'}
                />
              )}
            </>
          ),
        }}
      />
    </Navigator>
  );
}
