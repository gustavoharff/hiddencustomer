import React from 'react';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends BaseButtonProperties {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  backgroundColor,
  textColor,
  ...rest
}) => (
  <Container backgroundColor={backgroundColor} {...rest}>
    <ButtonText textColor={textColor}>{title}</ButtonText>
  </Container>
);

export { Button };
