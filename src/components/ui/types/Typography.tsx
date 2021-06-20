import React, { ReactNode } from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextProps,
} from 'react-native';

import { SPACING, colors } from 'styles';

export interface TypographyProps extends TextProps {
  defStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  margin?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  children?: ReactNode;
  dark?: boolean;
  center?: boolean;
  bold?: boolean;
}

const styles = StyleSheet.create({
  dark: {
    color: colors.gray[900],
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export function Typography({
  defStyle,
  style,
  children,
  margin,
  dark,
  center,
  bold,
  ...rest
}: TypographyProps): JSX.Element {
  return (
    <Text
      style={[
        defStyle,
        style,
        margin && { marginBottom: SPACING[margin] },
        center && styles.center,
        dark && styles.dark,
        bold && styles.bold,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
