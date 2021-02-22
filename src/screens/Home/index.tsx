import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import { BottomButton, CustomersList, ListHeader } from 'components';

import { api, getRealm } from 'services';

import { Customer } from 'types';

import { useCustomers, useAuth } from 'hooks';

import { Container } from './styles';

const Home: React.FC = () => {
  const { customers, setCustomers } = useCustomers();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  useEffect(() => {
    api
      .get('/customers/me')
      .then(response => {
        setCustomers(response.data);

        getRealm().then(realm => {
          console.log(realm.path);
          realm.write(() => {
            const data = realm.objects('Customer');

            realm.delete(data);
            response.data.map((customer: Customer) =>
              realm.create('Customer', customer),
            );
          });
        });
      })
      .catch(async () => {
        const realm = await getRealm();

        const data = realm.objects<Customer>('Customer').sorted('name', true);

        setCustomers(data as any);
      });
  }, [setCustomers]);

  const onRefresh = useCallback(async () => {
    try {
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
    } catch {
      const realm = await getRealm();
      const data = realm.objects<Customer>('Customer').sorted('name', true);

      setCustomers(data as any);
    }
  }, [setCustomers]);

  const { user } = useAuth();

  return (
    <>
      <ListHeader title="Clientes" />
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

export { Home };
