import React, { useEffect, useState } from 'react';

import { Container, Title } from './styles';

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
      <Title>{company.name}</Title>
      <Logo size={SPACING.XXL} />
    </Container>
  );
};

export default DrawerInfo;
