import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface ScreenIndicatorProps {
  backgroundColor: string;
}

export function ScreenIndicator({
  backgroundColor,
  ...rest
}: ScreenIndicatorProps): JSX.Element {
  return <View style={[styles.container, { backgroundColor }]} {...rest} />;
}
