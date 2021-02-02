import React from 'react';

import logo from '../../assets/logo.png';

import { Image } from './styles';

interface LogoProps {
  size: number | string;
}

const Logo: React.FC<LogoProps> = ({ size }) => (
  <Image source={logo} size={size} />
);

export default Logo;
