import React from 'react';

import { Container, Text } from './styles';

interface OptionItemProps {
  onPress: () => void;
  color: string;
  text: string;
  textColor: 'dark' | 'light';
}

export function OptionItem({
  onPress,
  text,
  color,
  textColor,
}: OptionItemProps): JSX.Element {
  return (
    <Container onPress={onPress} color={color}>
      <Text color={textColor}>{text}</Text>
    </Container>
  );
}
