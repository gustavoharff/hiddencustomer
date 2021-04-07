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

export function Button({
  title,
  backgroundColor,
  textColor,
  loading,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ButtonText textColor={textColor}>{title}</ButtonText>
      )}
    </Container>
  );
}
