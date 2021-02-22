import React from 'react';

import { Container, Text } from './styles';

type EmptyListProps = {
  text: string;
};

const EmptyList: React.FC<EmptyListProps> = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

export { EmptyList };
