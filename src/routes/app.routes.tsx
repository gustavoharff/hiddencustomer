import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Menu from '../components/Icons/Menu';
import Logo from '../components/Logo';

import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Drawer from '../screens/Drawer';

import { COLORS, SPACING } from '../styles/tokens';

const { width } = Dimensions.get('window');

const HomeNavigator = createStackNavigator();

const HomeNavigation: React.FC = () => (
  <HomeNavigator.Navigator
    screenOptions={({ navigation }) => ({
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Menu />
        </TouchableOpacity>
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <HomeNavigator.Screen name="Home" component={Home} />
  </HomeNavigator.Navigator>
);

const ProfileNavigator = createStackNavigator();

const ProfileNavition: React.FC = () => (
  <ProfileNavigator.Navigator
    screenOptions={({ navigation }) => ({
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Menu />
        </TouchableOpacity>
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <ProfileNavigator.Screen name="Profile" component={Profile} />
  </ProfileNavigator.Navigator>
);

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
    <DrawerNavigator.Screen name="Profile" component={ProfileNavition} />
  </DrawerNavigator.Navigator>
);

export default DrawerNavigation;
