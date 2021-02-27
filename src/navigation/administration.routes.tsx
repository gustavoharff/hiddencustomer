import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Logo, MenuHeaderIcon } from 'components';

import { COLORS, SPACING } from 'styles';

import { Administration } from 'screens';

const AdministrationNavigator = createStackNavigator();

const AdministrationRoutes: React.FC = () => (
  <AdministrationNavigator.Navigator
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
    <AdministrationNavigator.Screen
      name="Administration"
      component={Administration}
    />
  </AdministrationNavigator.Navigator>
);

export { AdministrationRoutes };
