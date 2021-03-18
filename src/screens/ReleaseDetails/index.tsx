import React, { useCallback, useEffect, useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

import { Release, Customer } from 'types';

import { api, getRealm } from 'services';

import { ListHeader } from 'components';

import { ReleaseAnnotations } from './ReleaseAnnotations';
import { ReleaseDates } from './ReleaseDates';
import { ReleaseGroups } from './ReleaseGroups';

type Params = {
  ReleaseDetails: {
    release_id: string;
    customer_id: string;
  };
};

type Props = StackScreenProps<Params, 'ReleaseDetails'>;

const ReleaseDetails: React.FC<Props> = ({ route }) => {
  const [release, setRelease] = useState<Release>({} as Release);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [loadingRelease, setLoadingRelease] = useState(true);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [
    { key: 'groups', title: 'Grupos' },
    { key: 'dates', title: 'Datas' },
    { key: 'annotations', title: 'Anotações' },
  ];

  const loadLocalRelease = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objectForPrimaryKey<Release>(
      'Release',
      route.params.release_id,
    );

    if (!data) {
      return;
    }

    const formattedRelease = {
      id: data.id,
      name: data.name,
      customer_id: data.customer_id,
      company_id: data.company_id,
      paid: data.paid,
      annotations: data.annotations,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    setRelease(formattedRelease);
  }, [route.params.release_id]);

  const loadLocalCustomer = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objectForPrimaryKey<Customer>(
      'Customer',
      route.params.customer_id,
    );

    if (!data) {
      return;
    }

    const formattedCustomer = {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    setCustomer(formattedCustomer);
  }, [route.params.customer_id]);

  useEffect(() => {
    const { release_id, customer_id } = route.params;

    api
      .get(`/release/${release_id}`)
      .then(response => {
        setRelease(response.data);
      })
      .catch(() => loadLocalRelease())
      .finally(() => setLoadingRelease(false));

    api
      .get(`/customer/${customer_id}`)
      .then(response => {
        setCustomer(response.data);
      })
      .catch(() => loadLocalCustomer())
      .finally(() => setLoadingCustomer(false));
  }, [route.params, loadLocalRelease, loadLocalCustomer]);

  const renderScene = useCallback(
    ({ route: tabRoute }) => {
      switch (tabRoute.key) {
        case 'dates':
          return <ReleaseDates release_id={route.params.release_id} />;
        case 'groups':
          return <ReleaseGroups release_id={route.params.release_id} />;
        case 'annotations':
          return <ReleaseAnnotations release_id={release.id} />;
        default:
          return null;
      }
    },
    [route.params.release_id, release],
  );

  return (
    <>
      <ListHeader
        title={release.name}
        description={customer.name}
        loading={loadingRelease || loadingCustomer}
      />
      <TabView
        navigationState={{ routes: tabRoutes, index: tabIndex }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            indicatorStyle={{ backgroundColor: '#DC1637' }}
            activeColor="#fff"
            inactiveColor="#f3f3f3"
            style={{ backgroundColor: '#AEAEB3' }}
            {...props}
          />
        )}
      />
    </>
  );
};

export { ReleaseDetails };
