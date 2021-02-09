import React from 'react';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends BaseButtonProperties {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{title}</ButtonText>
  </Container>
);

export default Button;
