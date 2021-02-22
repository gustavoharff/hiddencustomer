import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Logo } from 'components';

import { Home, CustomerForm } from 'screens';

import { COLORS, SPACING } from 'styles';

const HomeNavigator = createStackNavigator();

const HomeRoutes: React.FC = () => (
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
      name="CustomerForm"
      component={CustomerForm}
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

export { HomeRoutes };
