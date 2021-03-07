import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { SPACING } from 'styles';

import { Container, Button } from './styles';

interface ButtonProps extends BaseButtonProperties {
  name: string;
}

const BottomButton: React.FC<ButtonProps> = ({ name, ...rest }) => (
  <Container style={{ elevation: 2 }}>
    <Button {...rest}>
      <Icon name={name} color="#fff" size={SPACING.XL * 2} />
    </Button>
  </Container>
);

export { BottomButton };
