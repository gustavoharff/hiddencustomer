import React from 'react';
import { Dimensions, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../components/Logo';

import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Drawer from '../screens/Drawer';
import Administration from '../screens/Administration';
import AddCustomer from '../screens/AddCustomer';

import { COLORS, SPACING } from '../styles/tokens';

const { width } = Dimensions.get('window');

const HomeNavigator = createStackNavigator();

const HomeNavigation: React.FC = () => (
  <HomeNavigator.Navigator
    mode="modal"
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: SPACING.S }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" color={COLORS.FONT} size={SPACING.L * 2} />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <HomeNavigator.Screen name="Home" component={Home} />
    <HomeNavigator.Screen
      name="AddCustomer"
      component={AddCustomer}
      options={({ navigation }) => ({
        headerLeft: () => (
          <View style={{ marginLeft: SPACING.S }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="close" color={COLORS.FONT} size={SPACING.L * 2} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
  </HomeNavigator.Navigator>
);

const ProfileNavigator = createStackNavigator();

const ProfileNavition: React.FC = () => (
  <ProfileNavigator.Navigator
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: SPACING.S }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" color={COLORS.FONT} size={SPACING.L * 2} />
          </TouchableOpacity>
        </View>
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

const AdministrationNavigator = createStackNavigator();

const AdministrationNavition: React.FC = () => (
  <AdministrationNavigator.Navigator
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: SPACING.S }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" color={COLORS.FONT} size={SPACING.L * 2} />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <AdministrationNavigator.Screen
      name="Administration"
      component={Administration}
    />
  </AdministrationNavigator.Navigator>
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
    <DrawerNavigator.Screen
      name="Administration"
      component={AdministrationNavition}
    />
  </DrawerNavigator.Navigator>
);

export default DrawerNavigation;
