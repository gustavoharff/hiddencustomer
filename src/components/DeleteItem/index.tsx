import React from 'react';

import { Container, Text } from './styles';

interface DeleteItemProps {
  onPress?: () => void;
}

export function DeleteItem({ onPress }: DeleteItemProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Text>Deletar</Text>
    </Container>
  );
}
