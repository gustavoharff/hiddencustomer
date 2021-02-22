import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Profile } from 'screens';

import { Logo } from 'components';

import { COLORS, SPACING } from 'styles';

const ProfileNavigator = createStackNavigator();

const ProfileRoutes: React.FC = () => (
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

export { ProfileRoutes };
