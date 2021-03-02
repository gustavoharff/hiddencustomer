import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  BackHeaderIcon,
  CloseHeaderIcon,
  Logo,
  MenuHeaderIcon,
} from 'components';

import {
  Releases,
  ReleaseForm,
  ReleaseDetails,
  ReleaseGroupForm,
  ReleaseAnnotationsForm,
} from 'screens';

import { COLORS, SPACING } from 'styles';

const ReleasesNavigator = createStackNavigator();

const ReleasesRoutes: React.FC = () => (
  <ReleasesNavigator.Navigator
    mode="card"
    initialRouteName="Releases"
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
      animationEnabled: true,
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
    <ReleasesNavigator.Screen name="Releases" component={Releases} />
    <ReleasesNavigator.Screen
      name="ReleaseForm"
      component={ReleaseForm}
      options={({ navigation }) => ({
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.navigate('Releases')} />
        ),
      })}
    />
    <ReleasesNavigator.Screen
      name="ReleaseDetails"
      component={ReleaseDetails}
      options={({ navigation }) => ({
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.goBack()} />
        ),
      })}
    />

    <ReleasesNavigator.Screen
      name="ReleaseGroupForm"
      component={ReleaseGroupForm}
      options={({ navigation }) => ({
        headerLeft: () => (
          <CloseHeaderIcon
            onPress={() => navigation.navigate('ReleaseDetails')}
          />
        ),
      })}
    />

    <ReleasesNavigator.Screen
      name="ReleaseAnnotationsForm"
      component={ReleaseAnnotationsForm}
      options={({ navigation }) => ({
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.goBack()} />
        ),
      })}
    />
  </ReleasesNavigator.Navigator>
);

export { ReleasesRoutes };
