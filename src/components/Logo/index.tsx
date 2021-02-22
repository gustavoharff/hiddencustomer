import React from 'react';

import logo from 'assets/logo.png';

import { Image } from './styles';

type LogoProps = {
  size: number;
};

const Logo: React.FC<LogoProps> = ({ size }) => (
  <Image source={logo} size={size} />
);

export { Logo };
