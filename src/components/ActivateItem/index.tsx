import React from 'react';

import { Container, Text } from './styles';

type ActivateItemProps = {
  onPress: () => void;
};

export function ActivateItem({ onPress }: ActivateItemProps) {
  return (
    <Container onPress={onPress}>
      <Text>Ativar</Text>
    </Container>
  );
}
