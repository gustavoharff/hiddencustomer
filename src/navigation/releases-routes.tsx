import React from 'react';
import { Dimensions } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HeaderIcon,
  ReleaseAnnotationsForm,
  ReleaseDateForm,
  ReleaseDateGroups,
  ReleaseDetails,
  ReleaseForm,
  ReleaseGroupForm,
  Releases,
  ReleasesFilter,
} from 'components';

import { SPACING } from 'styles';
import { DEFAULT } from './helper';

const { height } = Dimensions.get('window');

const Stack = createStackNavigator();

export function ReleasesScreen(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Releases"
        component={Releases}
        options={{
          headerTitle: 'Lançamentos',
        }}
      />
    </Stack.Navigator>
  );
}

export function ReleasesStack(): JSX.Element {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={({ navigation }) => ({
        ...DEFAULT,
        headerLeft: () => (
          <HeaderIcon
            name="arrow-left"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: SPACING.S }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="ReleaseDetails"
        component={ReleaseDetails}
        options={{
          headerTitle: 'Detalhes',
        }}
      />

      <Stack.Screen
        name="ReleaseForm"
        component={ReleaseForm}
        options={{
          headerTitle: 'Registrar lançamento',
        }}
      />

      <Stack.Screen
        name="ReleaseGroupForm"
        component={ReleaseGroupForm}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Cadastrar grupo',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ReleaseDateForm"
        component={ReleaseDateForm}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Cadastrar data',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ReleaseDateGroups"
        component={ReleaseDateGroups}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Grupos da data',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
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
    </Stack.Navigator>
  );
}

export function ReleasesVerticalStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        ...DEFAULT,
      }}
      mode="modal"
    >
      <Stack.Screen
        name="ReleasesFilter"
        component={ReleasesFilter}
        options={({ navigation }) => ({
          cardStyle: {
            maxHeight: height * 0.8,
            marginTop: 'auto',
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Filtrar lançamentos',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
