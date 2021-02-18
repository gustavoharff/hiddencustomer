import React from 'react';
import { Container, Image } from './styles';

interface AvatarProps {
  url: string;
  size: number;
}

const Avatar: React.FC<AvatarProps> = ({ url, size }) => (
  <Container>
    <Image
      size={size}
      source={{
        uri: url,
      }}
    />
  </Container>
);

export default Avatar;
