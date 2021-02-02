import React from 'react';

import Avatar from '../Avatar';

import { Container, Title, Text } from './styles';

interface DrawerUserProps {
  name: string;
  email: string;
  avatar?: string;
}

const DrawerUser: React.FC<DrawerUserProps> = ({ name, email, avatar }) => (
  <Container>
    <Avatar
      url={
        avatar ||
        'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
      }
    />
    <Title>{name}</Title>
    <Text>{email}</Text>
  </Container>
);

export default DrawerUser;
