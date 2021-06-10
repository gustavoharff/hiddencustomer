import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { TITLE, BODY, COLORS } from 'styles';

import { Typography, TypographyProps } from './Typography';

interface TypesProps extends TypographyProps {
  children?: ReactNode;
}

export const H1 = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.h1} {...props}>
    {children}
  </Typography>
);

export const H2 = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.h2} {...props}>
    {children}
  </Typography>
);

export const H3 = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.h3} {...props}>
    {children}
  </Typography>
);

export const H4 = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.h4} {...props}>
    {children}
  </Typography>
);

export const Body = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.body} {...props}>
    {children}
  </Typography>
);

export const Small = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.small} {...props}>
    {children}
  </Typography>
);

export const Tiny = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.tiny} {...props}>
    {children}
  </Typography>
);

export const Caps = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.caps} {...props}>
    {children}
  </Typography>
);

export const Bold = ({ children, ...props }: TypesProps): JSX.Element => (
  <Typography defStyle={styles.bold} {...props}>
    {children}
  </Typography>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: TITLE.XL.SIZE,
    color: COLORS.ACCENT,
    lineHeight: TITLE.XL.HEIGHT,
    fontWeight: '600',
  },
  h2: {
    fontSize: TITLE.L.SIZE,
    color: COLORS.ACCENT,
    lineHeight: TITLE.L.HEIGHT,
    fontWeight: '600',
  },
  h3: {
    fontSize: TITLE.M.SIZE,
    color: COLORS.FONT,
    lineHeight: TITLE.M.HEIGHT,
    fontWeight: '600',
  },
  h4: {
    fontSize: TITLE.S.SIZE,
    color: COLORS.FONT,
    lineHeight: TITLE.S.HEIGHT,
    fontWeight: '600',
  },
  body: {
    fontSize: BODY.M.SIZE,
    lineHeight: BODY.M.HEIGHT,
    fontWeight: '400',
    color: COLORS.FONT,
  },
  small: {
    fontSize: BODY.S.SIZE,
    lineHeight: BODY.S.HEIGHT,
    color: COLORS.FONT,
  },
  tiny: {
    fontSize: BODY.XS.SIZE,
    lineHeight: BODY.XS.HEIGHT,
    color: COLORS.FONT,
  },
  caps: {
    fontSize: BODY.S.SIZE,
    lineHeight: BODY.S.HEIGHT,
    textTransform: 'uppercase',
    color: COLORS.FONT,
  },
  bold: {
    fontWeight: '600',
  },
});
