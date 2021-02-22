import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Logo } from 'components';

import { Releases, ReleaseForm, ReleaseDetails } from 'screens';

import { COLORS, SPACING } from 'styles';

const ReleasesNavigator = createStackNavigator();

const ReleasesRoutes: React.FC = () => (
  <ReleasesNavigator.Navigator
    mode="modal"
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
          <View style={{ marginLeft: SPACING.S }}>
            <TouchableOpacity onPress={() => navigation.navigate('Releases')}>
              <Icon name="close" color={COLORS.FONT} size={SPACING.L * 2} />
            </TouchableOpacity>
          </View>
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
          <View style={{ marginLeft: SPACING.S }}>
            <TouchableOpacity onPress={() => navigation.navigate('Releases')}>
              <Icon name="close" color={COLORS.FONT} size={SPACING.L * 2} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
  </ReleasesNavigator.Navigator>
);

export { ReleasesRoutes };
