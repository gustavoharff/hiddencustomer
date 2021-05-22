import React, { ReactNode } from 'react';

import { Container } from './styles';

interface SectionProps {
  children: ReactNode;
  flex?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

export function Section({
  children,
  flex,
  alignCenter,
  justifyCenter,
}: SectionProps): JSX.Element {
  return (
    <Container
      flex={flex}
      alignCenter={alignCenter}
      justifyCenter={justifyCenter}
    >
      {children}
    </Container>
  );
}
