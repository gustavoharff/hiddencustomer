import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../screens/Drawer';

import HomeNavigation from './HomeNavigation';
import ProfileNavigation from './ProfileNavigation';
import AdministrationNavigation from './AdministrationNavigation';
import ReleasesNavigation from './ReleasesNavigation';

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
    <DrawerNavigator.Screen name="Home" component={HomeNavigation} />
    <DrawerNavigator.Screen name="Profile" component={ProfileNavigation} />
    <DrawerNavigator.Screen
      name="Administration"
      component={AdministrationNavigation}
    />
    <DrawerNavigator.Screen name="Releases" component={ReleasesNavigation} />
  </DrawerNavigator.Navigator>
);

export default DrawerNavigation;
