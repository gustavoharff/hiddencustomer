import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import BottomButton from '../../components/BottomButton';
import ItemList from '../../components/ItemList';

import { useCustomers } from '../../hooks/customers';
import { useAuth } from '../../hooks/auth';

import { Container, Header, Title } from './styles';

const Home: React.FC = () => {
  const { customers, setCustomers } = useCustomers();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('customers/me').then(response => {
      setCustomers(response.data);
    });
  }, [setCustomers]);

  const { user } = useAuth();

  return (
    <>
      <Header>
        <Title>Clientes</Title>
      </Header>

      <Container>
        <ItemList items={customers} setItems={setCustomers} />
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
