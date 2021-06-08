import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Text } from 'react-native';

import { CircularButton, Section } from 'components';

import { CustomersContext, useAuth } from 'hooks';

import { colors } from 'styles';

import { CustomersList } from '../../../features/customers-list';

import { Container } from './styles';

export function Customers(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { refresh, customers } = useContext(CustomersContext);

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
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const { user } = useAuth();

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator color={colors.gray[700]} />
      </Section>
    );
  }

  return (
    <Container>
      <CustomersList />

      {user.permission !== 'user' && (
        <CircularButton
          name="account-plus-outline"
          onPress={() =>
            navigation.navigate('CustomersStack', {
              screen: 'CustomerForm',
            })
          }
        />
      )}
    </Container>
  );
}
