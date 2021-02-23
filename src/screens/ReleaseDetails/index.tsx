import React, { useEffect, useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

import { Release, Customer } from 'types';

import { api } from 'services';

import { ListHeader, ReleaseDates, ReleaseGroups } from 'components';

import { COLORS } from 'styles';

type Params = {
  ReleaseDetails: {
    release_id: string;
  };
};

type Props = StackScreenProps<Params, 'ReleaseDetails'>;

const ReleaseDetails: React.FC<Props> = ({ route }) => {
  const [release, setRelease] = useState<Release>({} as Release);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [
    { key: 'groups', title: 'Grupos' },
    { key: 'dates', title: 'Datas' },
  ];

  useEffect(() => {
    const { release_id } = route.params;

    api.get(`/release/${release_id}`).then(response => {
      setRelease(response.data);
    });
  }, [route]);

  useEffect(() => {
    if (!release.customer_id) {
      return;
    }

    api.get(`/customer/${release.customer_id}`).then(response => {
      setCustomer(response.data);
    });
  }, [release.customer_id]);

  return (
    <>
      <ListHeader title={release.name} description={customer.name} />
      <TabView
        navigationState={{ routes: tabRoutes, index: tabIndex }}
        renderScene={({ route: tabRoute }) => {
          switch (tabRoute.key) {
            case 'dates':
              return <ReleaseDates release_id={release.id} />;
            case 'groups':
              return <ReleaseGroups release_id={release.id} />;
            default:
              return null;
          }
        }}
        onIndexChange={setTabIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.LIGHTEN_10 }}
            style={{ backgroundColor: COLORS.DARKEN_5 }}
          />
        )}
      />
    </>
  );
};

export { ReleaseDetails };
