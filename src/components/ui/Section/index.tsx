import React, { ReactNode } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import { SPACING } from 'styles';

interface SectionProps extends ViewProps {
  children?: ReactNode;
  flex?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
  paddingHorizontal?: boolean;
  paddingVertical?: boolean;
}

export function Section({
  children,
  flex,
  alignCenter,
  justifyCenter,
  paddingHorizontal,
  paddingVertical,
  style,
}: SectionProps): JSX.Element {
  const stylesList = [
    paddingHorizontal && { paddingHorizontal: SPACING.L },
    paddingVertical && { paddingVertical: SPACING.L },
    alignCenter && { alignItems: 'center' },
    justifyCenter && { justifyContent: 'center' },
    flex && { flex: 1 },
    style,
  ] as StyleProp<ViewStyle>;

  return <View style={stylesList}>{children}</View>;
}
