import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { Avatar, Section } from 'components';

import { colors, SPACING } from 'styles';

import { useAuth } from 'hooks';
import { AvatarContainer } from './styles';

import { MyInfos } from './my-infos';
import { MyNumbers } from './my-numbers';

export function Profile(): JSX.Element {
  const { user } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [
    { key: 'info', title: 'Informações' },
    {
      key: 'telephones',
      title: 'Meus números',
    },
  ];

  const renderScene = useCallback(({ route: tabRoute }) => {
    switch (tabRoute.key) {
      case 'info':
        return <MyInfos />;
      case 'telephones':
        return <MyNumbers />;
      default:
        return null;
    }
  }, []);

  return (
    <Section flex>
      <AvatarContainer>
        <Avatar
          url={
            user.avatar_url ??
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
          }
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
            indicatorStyle={{ backgroundColor: colors.red[500] }}
            activeColor={colors.white}
            inactiveColor={colors.white}
            style={{ backgroundColor: colors.gray[900] }}
            {...props}
          />
        )}
      />
    </Section>
  );
}
