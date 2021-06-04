import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BaseButtonProperties } from 'react-native-gesture-handler';

import { colors } from 'styles';

import { Container, ButtonText, MaxWidth } from './styles';

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
    <MaxWidth>
      <Container backgroundColor={backgroundColor} {...rest}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <ButtonText textColor={textColor}>{title}</ButtonText>
        )}
      </Container>
    </MaxWidth>
  );
}
