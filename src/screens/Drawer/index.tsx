import React, { useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import {
  DrawerCustomersIcon,
  DrawerAdminIcon,
  DrawerRocketIcon,
  DrawerProfileIcon,
  DrawerUser,
  DrawerList,
  DrawerInfo,
} from 'components';

import { useAuth } from 'hooks';

import { StatusBar, Container } from './styles';

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { user } = useAuth();

  const items = useMemo(
    () => [
      {
        title: 'Lançamentos',
        onPress: () => navigation.navigate('Releases'),
        icon: DrawerRocketIcon,
        canAccess: true,
      },
      {
        title: 'Clientes',
        onPress: () => navigation.navigate('Customers'),
        icon: DrawerCustomersIcon,
        canAccess: true,
      },
      {
        title: 'Administração',
        onPress: () => navigation.navigate('Administration'),
        icon: DrawerAdminIcon,
        canAccess: user.permission === 'admin',
      },
      {
        title: 'Perfil',
        onPress: () => navigation.navigate('Profile'),
        icon: DrawerProfileIcon,
        canAccess: true,
      },
    ],
    [navigation, user.permission],
  );

  return (
    <>
      <StatusBar />
      <Container>
        <DrawerUser
          email={user.email}
          name={user.name}
          avatar_url={user.avatar_url}
          navigation={navigation}
        />

        <DrawerList items={items} />

        <DrawerInfo />
      </Container>
    </>
  );
};

export { Drawer };
