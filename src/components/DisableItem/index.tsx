import React from 'react';

import { Container, Text } from './styles';

interface DisableItemProps {
  onPress: () => void;
}

export function DisableItem({ onPress }: DisableItemProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Text>Desabilitar</Text>
    </Container>
  );
}
