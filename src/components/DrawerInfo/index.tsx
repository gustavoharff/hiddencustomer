import React, { useEffect, useState } from 'react';

import { SPACING } from 'styles';

import { api } from 'services';

import { Company } from 'types';

import { Logo } from 'components';

import { Container, Title, Version } from './styles';

const DrawerInfo: React.FC = () => {
  const [company, setCompany] = useState<Company>({} as Company);

  useEffect(() => {
    api.get('companies/me').then(response => {
      setCompany(response.data);
    });
  }, []);

  return (
    <Container>
      <Logo size={SPACING.XXL} />
      {company.name && <Title>{company.name}</Title>}
      <Version>Cliente Oculto - 0.0.1</Version>
    </Container>
  );
};

export { DrawerInfo };
