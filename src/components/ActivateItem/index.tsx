import React from 'react';

import { Container, Text } from './styles';

interface ActivateItemProps {
  onPress: () => void;
}

export function ActivateItem({ onPress }: ActivateItemProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Text>Ativar</Text>
    </Container>
  );
}
