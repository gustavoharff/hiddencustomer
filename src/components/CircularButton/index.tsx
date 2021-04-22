import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING } from 'styles';

import { Container, Button } from './styles';

interface CircularButtonProps {
  name: string;
  onPress: () => void;
}

export function CircularButton({
  name,
  onPress,
  ...rest
}: CircularButtonProps): JSX.Element {
  return (
    <Container>
      <Button onPress={onPress} {...rest}>
        <Icon name={name} color="#fff" size={SPACING.XL * 2} />
      </Button>
    </Container>
  );
}
