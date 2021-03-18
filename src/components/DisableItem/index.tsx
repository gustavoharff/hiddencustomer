import React from 'react';

import { Container, Text } from './styles';

type DisableItemProps = {
  onPress: () => void;
};

export function DisableItem({ onPress }: DisableItemProps) {
  return (
    <Container onPress={onPress}>
      <Text>Desabilitar</Text>
    </Container>
  );
}
