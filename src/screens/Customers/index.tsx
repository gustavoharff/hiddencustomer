import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Platform } from 'react-native';

import { BottomButton } from 'components';

import { useCustomers, useAuth } from 'hooks';

import { COLORS } from 'styles';

import { CustomersList } from './CustomersList';

import { Container, Center } from './styles';

export function Customers() {
  const [loading, setLoading] = useState(true);

  const { loadApiCustomers, loadLocalCustomers } = useCustomers();

  const navigation = useNavigation();

  useEffect(() => {
    loadApiCustomers()
      .catch(() => {
        loadLocalCustomers();
      })
      .finally(() => setLoading(false));
  }, [loadApiCustomers, loadLocalCustomers]);

  const onRefresh = useCallback(async () => {
    loadApiCustomers().catch(() => {
      loadLocalCustomers();
    });
  }, [loadApiCustomers, loadLocalCustomers]);

  const { user } = useAuth();

  if (loading) {
    return (
      <Center>
        <ActivityIndicator
          color={Platform.OS === 'ios' ? COLORS.BACKGROUND_LIGHT : COLORS.ALERT}
          size={30}
        />
      </Center>
    );
  }

  return (
    <>
      <Container>
        <CustomersList
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
}
