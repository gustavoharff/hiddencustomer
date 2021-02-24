import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BackHeaderIcon, CloseHeaderIcon, Logo } from 'components';

import {
  Releases,
  ReleaseForm,
  ReleaseDetails,
  ReleaseGroupForm,
} from 'screens';

import { COLORS, SPACING } from 'styles';

const ReleasesNavigator = createStackNavigator();

const ReleasesRoutes: React.FC = () => (
  <ReleasesNavigator.Navigator
    mode="card"
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: 'transparent',
      },
      animationEnabled: true,
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
    <ReleasesNavigator.Screen
      name="Releases"
      component={Releases}
      options={() => ({
        cardStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
      })}
    />
    <ReleasesNavigator.Screen
      name="ReleaseForm"
      component={ReleaseForm}
      options={({ navigation }) => ({
        cardStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.navigate('Releases')} />
        ),
      })}
    />
    <ReleasesNavigator.Screen
      name="ReleaseDetails"
      component={ReleaseDetails}
      options={({ navigation }) => ({
        cardStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        headerLeft: () => (
          <BackHeaderIcon onPress={() => navigation.goBack()} />
        ),
      })}
    />

    <ReleasesNavigator.Screen
      name="ReleaseGroupForm"
      component={ReleaseGroupForm}
      options={({ navigation }) => ({
        cardStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        headerLeft: () => (
          <CloseHeaderIcon
            onPress={() => navigation.navigate('ReleaseDetails')}
          />
        ),
      })}
    />
  </ReleasesNavigator.Navigator>
);

export { ReleasesRoutes };
