import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../screens/Drawer';

import { HomeRoutes } from './home.routes';
import { ProfileRoutes } from './profile.routes';
import { AdministrationRoutes } from './administration.routes';
import { ReleasesRoutes } from './releases.routes';

const { width } = Dimensions.get('window');

const DrawerNavigator = createDrawerNavigator();

const DrawerNavigation: React.FC = () => (
  <DrawerNavigator.Navigator
    initialRouteName="Home"
    drawerType="back"
    overlayColor="rgba(0, 0, 0, 0)"
    drawerStyle={{ width: width * 0.8 }}
    drawerContent={props => <Drawer {...props} />}
  >
    <DrawerNavigator.Screen name="Home" component={HomeRoutes} />
    <DrawerNavigator.Screen name="Profile" component={ProfileRoutes} />
    <DrawerNavigator.Screen
      name="Administration"
      component={AdministrationRoutes}
    />
    <DrawerNavigator.Screen name="Releases" component={ReleasesRoutes} />
  </DrawerNavigator.Navigator>
);

export default DrawerNavigation;
