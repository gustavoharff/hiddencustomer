import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenIndicator } from 'components';
import { useAuth } from 'hooks';
import { ReleasesRoutes } from './releases.routes';
import { CustomersRoutes } from './customers.routes';
import { ProfileRoutes } from './profile.routes';
import { AdministrationRoutes } from './administration.routes';

const { Navigator, Screen } = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Navigator>
      <Screen
        name="Releases"
        component={ReleasesRoutes}
        options={({ navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: exploreState } = routes[index];
          let tabBarVisible = true;
          if (exploreState) {
            const { routes: exploreRoutes, index: exploreIndex } = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (
              exploreActiveRoute.name === 'ReleaseForm' ||
              exploreActiveRoute.name === 'ReleaseAnnotationsForm'
            ) {
              tabBarVisible = false;
            }
          }
          return {
            tabBarLabel: () => null,
            tabBarVisible,
            tabBarIcon: ({ size, focused }) => (
              <>
                <Icon
                  name="rocket-launch-outline"
                  size={size}
                  color={focused ? '#DC1637' : '#A8A8B3'}
                />
                {focused && (
                  <ScreenIndicator
                    style={{ backgroundColor: focused ? '#DC1637' : '#A8A8B3' }}
                  />
                )}
              </>
            ),
          };
        }}
      />

      <Screen
        name="Customers"
        component={CustomersRoutes}
        options={({ navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: exploreState } = routes[index];
          let tabBarVisible = true;
          if (exploreState) {
            const { routes: exploreRoutes, index: exploreIndex } = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (exploreActiveRoute.name === 'CustomerForm') {
              tabBarVisible = false;
            }
          }
          return {
            tabBarVisible,
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
                    style={{ backgroundColor: focused ? '#DC1637' : '#A8A8B3' }}
                  />
                )}
              </>
            ),
          };
        }}
      />
      {user.permission === 'admin' && (
        <Screen
          name="Administration"
          component={AdministrationRoutes}
          options={({ navigation }) => {
            const { routes, index } = navigation.dangerouslyGetState();
            const { state: exploreState } = routes[index];
            let tabBarVisible = true;
            if (exploreState) {
              const {
                routes: exploreRoutes,
                index: exploreIndex,
              } = exploreState;
              const exploreActiveRoute = exploreRoutes[exploreIndex];
              if (exploreActiveRoute.name === 'UserForm') {
                tabBarVisible = false;
              }
            }
            return {
              tabBarVisible,
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
                      style={{
                        backgroundColor: focused ? '#DC1637' : '#A8A8B3',
                      }}
                    />
                  )}
                </>
              ),
            };
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
                  style={{ backgroundColor: focused ? '#DC1637' : '#A8A8B3' }}
                />
              )}
            </>
          ),
        }}
      />
    </Navigator>
  );
};

export { TabRoutes };
