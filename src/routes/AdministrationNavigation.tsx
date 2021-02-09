import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../components/Logo';

import Administration from '../screens/Administration';

import { COLORS, SPACING } from '../styles/tokens';

const AdministrationNavigator = createStackNavigator();

const AdministrationNavigation: React.FC = () => (
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

export default AdministrationNavigation;
