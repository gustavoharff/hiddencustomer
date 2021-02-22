import React from 'react';

import { Avatar } from 'components';

import { SPACING } from 'styles';

import { Container, Title, Text } from './styles';

type DrawerUserProps = {
  name: string;
  email: string;
  avatar_url?: string;
};

const DrawerUser: React.FC<DrawerUserProps> = ({ name, email, avatar_url }) => (
  <Container>
    <Avatar
      size={SPACING.M * 8}
      url={
        avatar_url ||
        'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
      }
    />
    <Title>{name}</Title>
    <Text>{email}</Text>
  </Container>
);

export { DrawerUser };
