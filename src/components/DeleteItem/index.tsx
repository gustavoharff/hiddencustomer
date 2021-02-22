import React from 'react';

import { Container, Text } from './styles';

type DeleteItemProps = {
  onPress?: () => void;
};

const DeleteItem: React.FC<DeleteItemProps> = ({ onPress }) => (
  <Container onPress={onPress}>
    <Text>Deletar</Text>
  </Container>
);

export { DeleteItem };
