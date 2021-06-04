import React from 'react';

import { Container } from './styles';

interface ScreenIndicatorProps {
  backgroundColor: string;
}

export function ScreenIndicator({
  backgroundColor,
  ...rest
}: ScreenIndicatorProps): JSX.Element {
  return <Container style={{ backgroundColor }} {...rest} />;
}
