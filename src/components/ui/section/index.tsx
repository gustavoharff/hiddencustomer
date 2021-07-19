import React, { ReactNode } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import { SPACING } from 'styles';

interface SectionProps extends ViewProps {
  children?: ReactNode;
  flex?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
  paddingHorizontalSize?: keyof typeof SPACING;
  paddingHorizontal?: boolean;
  paddingVertical?: boolean;
  background?: boolean;
  marginVertical?: boolean;
  marginHorizontal?: boolean;
  marginBottom?: boolean;
  marginTop?: boolean;
}

export function Section({
  children,
  flex,
  alignCenter,
  justifyCenter,
  paddingHorizontal,
  paddingVertical,
  paddingHorizontalSize = 'L',
  background,
  marginVertical,
  marginHorizontal,
  marginBottom,
  marginTop,
  style,
}: SectionProps): JSX.Element {
  const stylesList = [
    paddingHorizontal && { paddingHorizontal: SPACING[paddingHorizontalSize] },
    paddingVertical && { paddingVertical: SPACING[paddingHorizontalSize] },
    alignCenter && { alignItems: 'center' },
    justifyCenter && { justifyContent: 'center' },
    flex && { flex: 1 },
    background && { backgroundColor: '#f4f5f6' },
    marginVertical && { marginVertical: SPACING.L },
    marginHorizontal && { marginHorizontal: SPACING.L },
    marginBottom && { marginBottom: SPACING.L },
    marginTop && { marginTop: SPACING.L },
    style,
  ] as StyleProp<ViewStyle>;

  return <View style={stylesList}>{children}</View>;
}
