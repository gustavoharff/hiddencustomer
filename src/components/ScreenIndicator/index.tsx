import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type ScreenIndicatorProps = {
  backgroundColor: string;
};

export function ScreenIndicator({
  backgroundColor,
  ...rest
}: ScreenIndicatorProps) {
  return <View style={[styles.container, { backgroundColor }]} {...rest} />;
}
