import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { Avatar } from 'components';

import { SPACING } from 'styles';

import { Container, Title, Text } from './styles';

type DrawerUserProps = {
  name: string;
  email: string;
  avatar_url?: string;
  navigation: DrawerNavigationHelpers;
};

const DrawerUser: React.FC<DrawerUserProps> = ({
  name,
  email,
  avatar_url,
  navigation,
}) => (
  <Container>
    <TouchableOpacity
      style={{ alignItems: 'center' }}
      onPress={() => navigation.navigate('Profile')}
    >
      <Avatar
        size={SPACING.M * 7}
        url={
          avatar_url ||
          'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
        }
      />
      <Title>{name}</Title>
      <Text>{email}</Text>
    </TouchableOpacity>
  </Container>
);

export { DrawerUser };
