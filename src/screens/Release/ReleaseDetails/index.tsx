import React, { useCallback, useEffect, useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

import { Release } from 'types';

import { ListHeader } from 'components';

import { colors } from 'styles';
import { ReleaseAnnotations } from './ReleaseAnnotations';
import { ReleaseDates } from './ReleaseDates';
import { ReleaseGroups } from './ReleaseGroups';

type Params = {
  ReleaseDetails: {
    release: Release;
  };
};

type Props = StackScreenProps<Params, 'ReleaseDetails'>;

export function ReleaseDetails({ route }: Props): JSX.Element {
  const { release } = route.params;
  const [tabIndex, setTabIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();

    parent?.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const tabRoutes = [
    { key: 'groups', title: 'Grupos' },
    { key: 'dates', title: 'Datas' },
    { key: 'annotations', title: 'Anotações' },
  ];

  const renderScene = useCallback(
    ({ route: tabRoute }) => {
      switch (tabRoute.key) {
        case 'dates':
          return <ReleaseDates release={release} />;
        case 'groups':
          return <ReleaseGroups release={release} />;
        case 'annotations':
          return <ReleaseAnnotations release_id={release.id} />;
        default:
          return null;
      }
    },
    [release],
  );

  return (
    <>
      <ListHeader title={release.name} description={release.customer?.name} />
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
    </>
  );
}