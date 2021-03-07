import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends BaseButtonProperties {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  backgroundColor,
  textColor,
  loading,
  ...rest
}) => (
  <Container backgroundColor={backgroundColor} {...rest}>
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <ButtonText textColor={textColor}>{title}</ButtonText>
    )}
  </Container>
);

export { Button };
