import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackHeaderIcon, CloseHeaderIcon } from 'components';

import {
  Releases,
  ReleaseForm,
  ReleaseDetails,
  ReleaseGroupForm,
  ReleaseAnnotationsForm,
} from 'screens';
import { useReleases } from 'hooks';

const { Navigator, Screen } = createStackNavigator();

const ReleasesRoutes: React.FC = () => {
  const { releases } = useReleases();

  return (
    <Navigator
      mode="card"
      initialRouteName="Releases"
      screenOptions={{
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
              {releases.length} lançamento(s)
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
          headerTitle: 'Editar anotação',
          headerLeft: () => (
            <BackHeaderIcon onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Navigator>
  );
};

export { ReleasesRoutes };
