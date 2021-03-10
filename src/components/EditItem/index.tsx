import React from 'react';

import { Container, Text } from './styles';

type EditItemProps = {
  onPress?: () => void;
};

const EditItem: React.FC<EditItemProps> = ({ onPress }) => (
  <Container onPress={onPress}>
    <Text>Editar</Text>
  </Container>
);

export { EditItem };
