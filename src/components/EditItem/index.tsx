import React from 'react';

import { Container, Text } from './styles';

interface EditItemProps {
  onPress?: () => void;
}

export function EditItem({ onPress }: EditItemProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Text>Editar</Text>
    </Container>
  );
}
