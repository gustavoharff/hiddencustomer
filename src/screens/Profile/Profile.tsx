import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Avatar } from 'components';

import { SPACING } from 'styles';

import { useAuth } from 'hooks';

import { Company } from 'types';

import { api } from 'services';

import { Container, FieldDescription, Text, Title } from './styles';

export function Profile(): JSX.Element {
  const { user } = useAuth();
  const [company, setCompany] = useState({} as Company);

  useEffect(() => {
    api.get('/companies/me').then(response => {
      setCompany(response.data);
    });
  }, []);

  return (
    <Container>
      <View style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: SPACING.L,
            backgroundColor: '#29292E',
          }}
        >
          <Avatar
            url="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
            size={SPACING.XL * 6}
          />
        </View>

        <Title>Suas informações</Title>
        <FieldDescription>Nome completo</FieldDescription>
        <Text>{user.name}</Text>

        <FieldDescription>Email</FieldDescription>
        <Text>{user.email}</Text>

        <FieldDescription>Empresa</FieldDescription>
        <Text>{company.name}</Text>
      </View>
    </Container>
  );
}
