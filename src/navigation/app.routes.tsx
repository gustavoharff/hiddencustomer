import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { HeaderIcon, TabBarIcon } from 'components';

import { useAuth } from 'hooks';

import {
  Administration,
  Calendar,
  ChangeUserInfo,
  ChangeUserPassword,
  Configuration,
  CustomerForm,
  Customers,
  Loggout,
  Profile,
  ReleaseAnnotationsForm,
  ReleaseDateForm,
  ReleaseDateGroups,
  ReleaseDetails,
  ReleaseForm,
  ReleaseGroupForm,
  Releases,
  ReleasesFilter,
  UserForm,
} from 'screens';

import { SPACING } from 'styles';

import { DEFAULT, NO_HEADER } from './helper';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function ReleasesStack() {
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

function CustomersStack() {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Customers"
        component={Customers}
        options={{
          headerTitle: 'Clientes',
        }}
      />
    </Stack.Navigator>
  );
}

function AdministrationStack() {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Administration"
        component={Administration}
        options={{
          headerTitle: 'Administração',
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Meu perfil',
          headerRight: () => (
            <HeaderIcon
              name="cog-outline"
              onPress={() => {
                navigation.navigate('Configuration');
              }}
              style={{ marginRight: SPACING.L }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={DEFAULT}>
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: 'Calendário',
        }}
      />
    </Stack.Navigator>
  );
}

export function TabStack(): JSX.Element {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarLabel: () => null }}
      initialRouteName="Releases"
    >
      <Tab.Screen
        name="Releases"
        component={ReleasesStack}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="rocket-launch-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Customers"
        component={CustomersStack}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="account-group-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              name="calendar-multiselect"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {user.permission === 'admin' && (
        <Tab.Screen
          name="Administration"
          component={AdministrationStack}
          options={{
            tabBarIcon: ({ size, focused }) => (
              <TabBarIcon
                name="account-cog-outline"
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon name="account-outline" size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppStack(): JSX.Element {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        ...DEFAULT,
        ...NO_HEADER,
      }}
    >
      <Stack.Screen name="Tab" component={TabStack} />

      {/* Releases Routes */}
      <Stack.Screen
        name="ReleaseDetails"
        component={ReleaseDetails}
        options={({ navigation }) => ({
          headerShown: true,
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

      <Stack.Screen
        name="ReleaseForm"
        component={ReleaseForm}
        options={({ navigation }) => ({
          headerShown: true,
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

      <Stack.Screen
        name="ReleaseGroupForm"
        component={ReleaseGroupForm}
        options={({ navigation }) => ({
          headerShown: true,
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
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Cadastrar data',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.navigate('ReleaseDetails')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ReleaseDateGroups"
        component={ReleaseDateGroups}
        options={({ navigation }) => ({
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: 'Grupos da data',
          headerLeft: () => (
            <HeaderIcon
              name="close"
              onPress={() => navigation.navigate('ReleaseDetails')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ReleaseAnnotationsForm"
        component={ReleaseAnnotationsForm}
        options={({ navigation }) => ({
          headerShown: true,
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

      <Stack.Screen
        name="ReleasesFilter"
        component={ReleasesFilter}
        options={({ navigation }) => ({
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

      {/* Customers Routes */}
      <Stack.Screen
        name="CustomerForm"
        component={CustomerForm}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Registrar cliente',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.navigate('Customers')}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      {/* Administration Routes */}
      <Stack.Screen
        name="UserForm"
        component={UserForm}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Cadastrar usuário',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      {/* Profile Routes */}
      <Stack.Screen
        name="Configuration"
        component={Configuration}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Configurações',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ChangeUserInfo"
        component={ChangeUserInfo}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Alterar dados do perfil',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ChangeUserPassword"
        component={ChangeUserPassword}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Alterar senha',
          headerLeft: () => (
            <HeaderIcon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: SPACING.S }}
            />
          ),
        })}
      />

      <Stack.Screen name="Loggout" component={Loggout} />
    </Stack.Navigator>
  );
}
