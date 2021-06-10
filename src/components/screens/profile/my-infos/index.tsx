import React, { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

import { Section, Small } from 'components';
import { useAuth } from 'hooks';
import { Company } from 'types';
import { api } from 'services';
import { Body } from 'components/ui';
import { ScrollView } from 'react-native';

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
        <Section background paddingHorizontal paddingVertical marginBottom>
          <Small dark>Nome completo</Small>
          <Body dark bold>
            {user.name}
          </Body>
        </Section>

        <Section background paddingHorizontal paddingVertical marginBottom>
          <Small dark>Email</Small>
          <Body dark bold>
            {user.email}
          </Body>
        </Section>

        <Section background paddingHorizontal paddingVertical marginBottom>
          <Small dark>Empresa</Small>
          <Body dark bold>
            {company.name}
          </Body>
        </Section>

        <Section background paddingHorizontal paddingVertical>
          <Small dark>Versão do aplicativo</Small>
          <Body dark bold>
            {version}
          </Body>
        </Section>
      </ScrollView>
    </Section>
  );
}
