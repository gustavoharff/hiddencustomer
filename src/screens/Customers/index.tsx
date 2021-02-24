import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import { BottomButton, CustomersList, ListHeader } from 'components';

import { api, getRealm } from 'services';

import { Customer } from 'types';

import { useCustomers, useAuth } from 'hooks';

import { Container } from './styles';

const Customers: React.FC = () => {
  const { customers, setCustomers } = useCustomers();
  const navigation = useNavigation();

  const loadLocalCustomers = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Customer>('Customer').sorted('name', true);

    const formattedCustomers = data.map(customer => ({
      id: customer.id,
      name: customer.name,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    }));

    setCustomers(formattedCustomers);
  }, [setCustomers]);

  const loadApiCustomers = useCallback(async () => {
    const response = await api.get('/customers/me');
    setCustomers(response.data);

    const realm = await getRealm();
    realm.write(() => {
      const data = realm.objects('Customer');

      realm.delete(data);
      response.data.map((customer: Customer) =>
        realm.create('Customer', customer),
      );
    });
  }, [setCustomers]);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  useEffect(() => {
    loadApiCustomers().catch(() => {
      loadLocalCustomers();
    });
  }, [loadApiCustomers, loadLocalCustomers]);

  const onRefresh = useCallback(async () => {
    loadApiCustomers().catch(() => {
      loadLocalCustomers();
    });
  }, [loadApiCustomers, loadLocalCustomers]);

  const { user } = useAuth();

  return (
    <>
      <ListHeader
        title="Clientes"
        description={`Total de clientes cadastrados: ${customers.length}`}
      />
      <Container>
        <CustomersList
          customers={customers}
          setCustomers={setCustomers}
          onRefresh={onRefresh}
          emptyListText="Nenhum cliente cadastrado."
        />
      </Container>
      {user.permission !== 'user' && (
        <BottomButton
          name="plus"
          onPress={() => navigation.navigate('CustomerForm')}
        />
      )}
    </>
  );
};

export { Customers };
