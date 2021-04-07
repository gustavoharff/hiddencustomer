import React from 'react';

import { Container, Text } from './styles';

interface EmptyListProps {
  text: string;
}

export function EmptyList({ text }: EmptyListProps): JSX.Element {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}
