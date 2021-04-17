import React from 'react';

import logo from 'assets/logo.png';

import { Image } from './styles';

interface LogoProps {
  size: number;
}

export function Logo({ size }: LogoProps): JSX.Element {
  return <Image source={logo} size={size} />;
}
