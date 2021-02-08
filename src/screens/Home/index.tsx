import React, { useEffect, useState } from 'react';
import Customer from '../../schemas/customer';

import api from '../../services/api';

import BottomButton from '../../components/BottomButton';
import ItemList from '../../components/ItemList';

import { Container } from './styles';

const Home: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get('customers/me').then(response => {
      setCustomers(response.data);
    });
  }, []);

  return (
    <Container>
      <ItemList items={customers} />
      <BottomButton />
    </Container>
  );
};

export default Home;
