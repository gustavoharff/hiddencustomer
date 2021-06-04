import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Platform, Text } from 'react-native';

import { CircularButton } from 'components';

import { useCustomers, useAuth } from 'hooks';

import { colors } from 'styles';

import { CustomersList } from './CustomersList';

import { Container, Center } from './styles';

export function Customers(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { loadApiCustomers, loadLocalCustomers, customers } = useCustomers();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ color: colors.gray[500], marginRight: 20 }}>
          {customers.length} cliente(s)
        </Text>
      ),
    });
  }, [customers.length, navigation]);

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
          color={Platform.OS === 'ios' ? colors.gray[800] : colors.red[500]}
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
        <CircularButton
          name="account-plus-outline"
          onPress={() => navigation.navigate('CustomerForm')}
        />
      )}
    </>
  );
}
