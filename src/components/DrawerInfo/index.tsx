import React, { useEffect, useState } from 'react';

import { Container, Title, Version } from './styles';

import Company from '../../schemas/company';

import api from '../../services/api';
import Logo from '../Logo';
import { SPACING } from '../../styles/tokens';

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

export default DrawerInfo;
