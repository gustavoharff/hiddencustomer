import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from 'screens';

import { Logo, MenuHeaderIcon } from 'components';

import { COLORS, SPACING } from 'styles';

const ProfileNavigator = createStackNavigator();

const ProfileRoutes: React.FC = () => (
  <ProfileNavigator.Navigator
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <MenuHeaderIcon onPress={() => navigation.toggleDrawer()} />
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
        shadowColor: 'transparent',
        elevation: 0,
      },
    })}
  >
    <ProfileNavigator.Screen name="Profile" component={Profile} />
  </ProfileNavigator.Navigator>
);

export { ProfileRoutes };
