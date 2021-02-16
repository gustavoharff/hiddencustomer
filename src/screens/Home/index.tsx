import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import BottomButton from '../../components/BottomButton';
import CustomersList from '../../components/CustomersList';
import ListHeader from '../../components/ListHeader';

import { useCustomers } from '../../hooks/customers';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Container } from './styles';

const Home: React.FC = () => {
  const { customers, setCustomers } = useCustomers();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/customers/me').then(response => {
      setCustomers(response.data);
    });
  }, [setCustomers]);

  const onRefresh = useCallback(async () => {
    const response = await api.get('/customers/me');
    setCustomers(response.data);
  }, [setCustomers]);

  const { user } = useAuth();

  return (
    <>
      <ListHeader title="Clientes" />
      <Container>
        <CustomersList
          items={customers}
          setItems={setCustomers}
          onRefresh={onRefresh}
          emptyListText="Nenhum cliente cadastrado."
        />
      </Container>
      {user.permission !== 'user' && (
        <BottomButton
          name="plus"
          onPress={() => navigation.navigate('AddCustomer')}
        />
      )}
    </>
  );
};

export default Home;
