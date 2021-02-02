import React, { useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Home from '../../components/Icons/Home';
import Profile from '../../components/Icons/Profile';
import Rocket from '../../components/Icons/Rocket';
import DrawerUser from '../../components/DrawerUser';
import DrawerList from '../../components/DrawerList';

import { useAuth } from '../../hooks/auth';

import { StatusBar, Container } from './styles';
import DrawerInfo from '../../components/DrawerInfo';

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { user } = useAuth();

  const items = useMemo(
    () => [
      {
        title: 'Página inicial',
        onPress: () => navigation.navigate('Home'),
        icon: Home,
      },
      {
        title: 'Lançamentos',
        onPress: () => navigation.navigate('Profile'),
        icon: Rocket,
      },
      {
        title: 'Perfil',
        onPress: () => navigation.navigate('Profile'),
        icon: Profile,
      },
    ],
    [navigation],
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
