import React, { ReactElement } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, SPACING } from 'styles';

import { Container, Button } from './styles';

interface CircularButtonProps {
  name: string;
  onPress: () => void;
  Image?: ReactElement;
}

export function CircularButton({
  name,
  onPress,
  Image,
  ...rest
}: CircularButtonProps): JSX.Element {
  return (
    <Container>
      <Button onPress={onPress} {...rest}>
        {Image || (
          <Icon name={name} color={colors.white} size={SPACING.XL * 1.5} />
        )}
      </Button>
    </Container>
  );
}
