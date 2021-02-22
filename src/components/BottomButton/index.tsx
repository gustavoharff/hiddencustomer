import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { COLORS, SPACING } from 'styles';

import { Container, Button } from './styles';

interface ButtonProps extends BaseButtonProperties {
  name: string;
}

const BottomButton: React.FC<ButtonProps> = ({ name, ...rest }) => (
  <Container>
    <Button {...rest}>
      <Icon name={name} color={COLORS.FONT} size={SPACING.L * 2} />
    </Button>
  </Container>
);

export { BottomButton };
