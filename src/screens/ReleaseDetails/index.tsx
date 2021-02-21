import React, { useEffect, useState } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, View } from 'react-native';

import Release from '../../schemas/release';
import api from '../../services/api';

import { Customer } from '../../schemas/customer';

import ListHeader from '../../components/ListHeader';
import { ReleaseDates } from '../../components/ReleaseDates';

import { COLORS } from '../../styles/tokens';

type Params = {
  ReleaseDetails: {
    release_id: string;
  };
};

type Props = StackScreenProps<Params, 'ReleaseDetails'>;

// import { Container } from './styles';

const GroupsRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }} />
);

const ReleaseDetails: React.FC<Props> = ({ route }) => {
  const [release, setRelease] = useState<Release>({} as Release);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [
    { key: 'dates', title: 'Datas' },
    { key: 'groups', title: 'Grupos' },
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
              return <ReleaseDates release_id={release.id} />;
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
