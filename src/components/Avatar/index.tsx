import React from 'react';
import { Container, Image } from './styles';

interface AvatarProps {
  url: string;
}

const Avatar: React.FC<AvatarProps> = ({ url }) => (
  <Container>
    <Image
      source={{
        uri: url,
      }}
    />
  </Container>
);

export default Avatar;
