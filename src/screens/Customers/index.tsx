import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { BottomButton } from 'components';

import { useCustomers, useAuth } from 'hooks';

import { CustomersList } from './CustomersList';

import { Container } from './styles';

const Customers: React.FC = () => {
  const {
    customers,
    setCustomers,
    loadApiCustomers,
    loadLocalCustomers,
  } = useCustomers();
  const navigation = useNavigation();

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
