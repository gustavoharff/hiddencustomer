import React, { useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Home from '../../components/DrawerIcons/Home';
import Rocket from '../../components/DrawerIcons/Rocket';
import Profile from '../../components/DrawerIcons/Profile';
import Admin from '../../components/DrawerIcons/Admin';

import DrawerUser from '../../components/DrawerUser';
import DrawerList from '../../components/DrawerList';
import DrawerInfo from '../../components/DrawerInfo';

import { useAuth } from '../../hooks/auth';

import { StatusBar, Container } from './styles';

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { user } = useAuth();

  const items = useMemo(
    () => [
      {
        title: 'Página inicial',
        onPress: () => navigation.navigate('Home'),
        icon: Home,
        canAccess: true,
      },
      {
        title: 'Lançamentos',
        onPress: () => navigation.navigate('Releases'),
        icon: Rocket,
        canAccess: true,
      },
      {
        title: 'Administração',
        onPress: () => navigation.navigate('Administration'),
        icon: Admin,
        canAccess: user.permission === 'admin',
      },
      {
        title: 'Perfil',
        onPress: () => navigation.navigate('Profile'),
        icon: Profile,
        canAccess: true,
      },
    ],
    [navigation, user.permission],
  );

  return (
    <>
      <StatusBar />
      <Container>
        <DrawerUser email={user.email} name={user.name} />

        <DrawerList items={items} />

        <DrawerInfo />
      </Container>
    </>
  );
};
export default Drawer;
