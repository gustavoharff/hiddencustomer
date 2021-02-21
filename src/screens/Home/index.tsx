import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import BottomButton from '../../components/BottomButton';
import { CustomersList } from '../../components/CustomersList';
import ListHeader from '../../components/ListHeader';

import { useCustomers } from '../../hooks/customers';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import getRealm from '../../services/realm';

import { Container } from './styles';
import { Customer } from '../../schemas/customer';

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

export default Home;
