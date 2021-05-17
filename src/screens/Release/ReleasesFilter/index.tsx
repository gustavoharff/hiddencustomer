import React, { useCallback, useEffect } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useCustomers } from 'hooks';

import { HeaderIcon } from 'components';

import { SPACING } from 'styles';

import { Picker } from 'components/Picker';

import { Container, Item, OptionText } from './styles';

export function ReleasesFilter(): JSX.Element {
  const navigation = useNavigation();

  const { customers, loadApiCustomers, loadLocalCustomers } = useCustomers();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-remove-outline"
          onPress={() => {
            console.log();
          }}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [navigation]);

  const onChange = useCallback(async value => {
    console.log(value);
  }, []);

  const onCustomerChange = useCallback(async value => {
    console.log(value);
  }, []);

  useEffect(() => {
    loadApiCustomers().catch(() => loadLocalCustomers());
  }, [loadApiCustomers, loadLocalCustomers]);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();

    parent?.setOptions({
      tabBarVisible: false,
    });

    return () =>
      parent?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  return (
    <Container>
      <Item>
        <OptionText>Exibir apenas lançamentos ativos e futuros</OptionText>
        <Switch onValueChange={onChange} value />
      </Item>

      <Item style={{ marginTop: 10 }}>
        <OptionText>Exibir apenas lançamentos de: </OptionText>
        <Picker
          value=""
          doneText="Selecionar"
          onChange={onCustomerChange}
          items={[
            { label: 'Todos', value: 'all' },
            ...customers.map(customer => ({
              label: customer.name,
              value: customer.id,
            })),
          ]}
          containerStyle={{ alignItems: 'flex-end' }}
        />
      </Item>
    </Container>
  );
}
