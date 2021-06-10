import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { Avatar, Section, H1 } from 'components';

import { colors, SPACING } from 'styles';

import { AvatarContainer } from './styles';

import { MyInfos } from './my-infos';

export function Profile(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [{ key: 'info', title: 'Informações' }];

  const renderScene = useCallback(({ route: tabRoute }) => {
    switch (tabRoute.key) {
      case 'info':
        return <MyInfos />;
      case 'telephones':
        return (
          <Section>
            <H1>Teste 2</H1>
          </Section>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Section flex>
      <AvatarContainer>
        <Avatar
          url="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
          size={SPACING.XL * 6}
        />
      </AvatarContainer>

      <TabView
        navigationState={{ routes: tabRoutes, index: tabIndex }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            indicatorStyle={{ backgroundColor: colors.gray[900] }}
            activeColor={colors.white}
            inactiveColor={colors.white}
            style={{ backgroundColor: colors.gray[900] }}
            {...props}
          />
        )}
      />

      {/* <Title>Suas informações</Title>
      <FieldDescription>Nome completo</FieldDescription>
      <Text>{user.name}</Text>

      <FieldDescription>Email</FieldDescription>
      <Text>{user.email}</Text>

      <FieldDescription>Empresa</FieldDescription>
      <Text>{company.name}</Text>

      <FieldDescription>Versão do aplicativo</FieldDescription>
      <Text>{version}</Text> */}
    </Section>
  );
}
