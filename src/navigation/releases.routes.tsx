import React from 'react';
import { Text } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { BackHeaderIcon, CloseHeaderIcon } from 'components';

import {
  Releases,
  ReleaseForm,
  ReleaseDetails,
  ReleaseGroupForm,
  ReleaseAnnotationsForm,
  ReleaseChange,
} from 'screens';

import { useReleases } from 'hooks';

const { Navigator, Screen } = createStackNavigator();

export function ReleasesRoutes() {
  const { releases } = useReleases();

  return (
    <Navigator
      mode="modal"
      initialRouteName="Releases"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: '#ffff',
        },
        headerTitleAlign: 'left',
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          height: 100,
          backgroundColor: '#1B1B1F',
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
          headerRight: () => (
            <Text style={{ color: '#7A7A80', marginRight: 20 }}>
              {releases.length ?? 0} lançamento(s)
            </Text>
          ),
        }}
      />

      <Screen
        name="ReleaseForm"
        component={ReleaseForm}
        options={({ navigation }) => ({
          headerTitle: 'Registrar lançamento',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.navigate('Releases')} />
          ),
        })}
      />

      <Screen
        name="ReleaseDetails"
        component={ReleaseDetails}
        options={({ navigation }) => ({
          headerTitle: 'Detalhes',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
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
            <CloseHeaderIcon
              onPress={() => navigation.navigate('ReleaseDetails')}
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
            <CloseHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <Screen
        name="ReleaseChange"
        component={ReleaseChange}
        options={({ navigation }) => ({
          headerTitle: 'Editar lançamento',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Navigator>
  );
}
