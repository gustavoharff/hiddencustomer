import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import Profile from '../screens/Profile';
import COLORS from '../styles/colors';

import Home from '../screens/Home';

const HomeNavigator = createStackNavigator();

const HomeNavigation: React.FC = () => (
  <HomeNavigator.Navigator
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text style={{ color: COLORS.FONT_LIGHT }}>Menu</Text>
        </TouchableOpacity>
      ),
      headerTintColor: COLORS.FONT_LIGHT,
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
  <ProfileNavigator.Navigator>
    <ProfileNavigator.Screen name="Profile" component={Profile} />
  </ProfileNavigator.Navigator>
);

const DrawerNavigator = createDrawerNavigator();

const DrawerNavigation: React.FC = () => (
  <DrawerNavigator.Navigator initialRouteName="Home" drawerType="back">
    <DrawerNavigator.Screen name="Home" component={HomeNavigation} />
    <DrawerNavigator.Screen name="Profile" component={ProfileNavition} />
  </DrawerNavigator.Navigator>
);

export default DrawerNavigation;
