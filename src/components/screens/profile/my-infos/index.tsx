import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Section, Small, Tiny } from 'components';

import { useAuth } from 'hooks';

import { Company } from 'types';

import { api } from 'services';

export function MyInfos(): JSX.Element {
  const [version] = useState(DeviceInfo.getReadableVersion());
  const [company, setCompany] = useState({} as Company);

  const { user } = useAuth();

  useEffect(() => {
    api.get('/companies/me').then(response => {
      setCompany(response.data);
    });
  }, []);

  return (
    <Section flex paddingHorizontal paddingVertical>
      <ScrollView>
        <Section
          background
          paddingHorizontalSize="M"
          paddingHorizontal
          paddingVertical
          marginBottom
        >
          <Tiny dark>Nome completo</Tiny>
          <Small dark>{user.name}</Small>
        </Section>

        <Section
          background
          paddingHorizontalSize="M"
          paddingHorizontal
          paddingVertical
          marginBottom
        >
          <Tiny dark>Email</Tiny>
          <Small dark>{user.email}</Small>
        </Section>

        <Section
          background
          paddingHorizontalSize="M"
          paddingHorizontal
          paddingVertical
          marginBottom
        >
          <Tiny dark>Empresa</Tiny>
          <Small dark>{company.name}</Small>
        </Section>

        <Section
          background
          paddingHorizontalSize="M"
          paddingHorizontal
          paddingVertical
        >
          <Tiny dark>Versão do aplicativo</Tiny>
          <Small dark>{version}</Small>
        </Section>
      </ScrollView>
    </Section>
  );
}
