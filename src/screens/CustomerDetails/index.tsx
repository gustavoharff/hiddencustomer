import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { getRealm } from 'services';

import { CustomerReleasesList, ListHeader } from 'components';

import { Customer, Release } from 'types';

type Params = {
  CustomerDetails: {
    customer_id: string;
  };
};

type Props = StackScreenProps<Params, 'CustomerDetails'>;

const CustomerDetails: React.FC<Props> = ({ route }) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customerReleases, setCustomerReleases] = useState<Release[]>([]);

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

  const loadLocalCustomerReleases = useCallback(async () => {
    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects<Release>('Release')
        .filtered(`customer_id == '${route.params.customer_id}'`);

      const formattedCustomerReleases = data.map(release => ({
        id: release.id,
        name: release.name,
        customer_id: release.customer_id,
        company_id: release.company_id,
        paid: release.paid,
        annotations: release.annotations,
        created_at: release.created_at,
        updated_at: release.updated_at,
      }));

      setCustomerReleases(formattedCustomerReleases);
    });
  }, [route.params.customer_id]);

  useEffect(() => {
    loadLocalCustomer();
    loadLocalCustomerReleases();
  }, [loadLocalCustomer, loadLocalCustomerReleases]);

  const onRefresh = useCallback(async () => {
    await loadLocalCustomer();
    await loadLocalCustomerReleases();
  }, [loadLocalCustomer, loadLocalCustomerReleases]);

  return (
    <>
      <ListHeader
        title={customer.name}
        description={`Adicionado ${moment(customer.updated_at)
          .utc(true)
          .locale('pt-br')
          .fromNow()}`}
      />
      <CustomerReleasesList
        releases={customerReleases}
        setReleases={setCustomerReleases}
        emptyListText="Não há lançamentos cadastrados para este cliente!"
        onRefresh={onRefresh}
      />
    </>
  );
};

export { CustomerDetails };
