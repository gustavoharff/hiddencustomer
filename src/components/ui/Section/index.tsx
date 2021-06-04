import React, { ReactNode } from 'react';

import { Container } from './styles';

interface SectionProps {
  children?: ReactNode;
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

export function Section({
  children,
  alignCenter,
  justifyCenter,
}: SectionProps): JSX.Element {
  return (
    <Container alignCenter={alignCenter} justifyCenter={justifyCenter}>
      {children}
    </Container>
  );
}
