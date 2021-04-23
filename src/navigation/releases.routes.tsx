import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { HeaderIcon } from 'components';

import {
  Releases,
  ReleaseForm,
  ReleaseDetails,
  ReleaseGroupForm,
  ReleaseAnnotationsForm,
  ReleaseChange,
  ReleaseGroupChange,
} from 'screens';

import { SPACING, colors } from 'styles';

const { Navigator, Screen } = createStackNavigator();

export function ReleasesStack(): JSX.Element {
  return (
    <Navigator
      mode="modal"
      initialRouteName="Releases"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerTitleAlign: 'left',
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          height: 100,
          backgroundColor: colors.gray[900],
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Screen
        name="Releases"
        component={Releases}
        options={{
          headerTitle: 'Lançamentos',
        }}
      />

      <Screen
        name="ReleaseForm"
        component={ReleaseForm}
        options={({ navigation }) => ({
          headerTitle: 'Registrar lançamento',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.navigate('Releases')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ReleaseDetails"
        component={ReleaseDetails}
        options={({ navigation }) => ({
          headerTitle: 'Detalhes',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ReleaseGroupForm"
        component={ReleaseGroupForm}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Cadastrar grupo',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.navigate('ReleaseDetails')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ReleaseGroupChange"
        component={ReleaseGroupChange}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Editar grupo',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.navigate('ReleaseDetails')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ReleaseAnnotationsForm"
        component={ReleaseAnnotationsForm}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Editar anotação',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Screen
        name="ReleaseChange"
        component={ReleaseChange}
        options={({ navigation }) => ({
          headerTitle: 'Editar lançamento',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />
    </Navigator>
  );
}
