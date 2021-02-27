import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from 'screens';

import { LoggoutHeaderIcon, Logo, MenuHeaderIcon } from 'components';

import { COLORS, SPACING } from 'styles';
import { useAuth } from 'hooks';

const ProfileNavigator = createStackNavigator();

const ProfileRoutes: React.FC = () => {
  const { signOut } = useAuth();

  return (
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
        headerRight: () => <LoggoutHeaderIcon onPress={signOut} />,
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
};

export { ProfileRoutes };
