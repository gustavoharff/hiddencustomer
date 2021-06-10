import React, { useCallback, useContext, useEffect } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomersContext, ReleasesContext } from 'hooks';

import { HeaderIcon, Picker } from 'components';

import { SPACING } from 'styles';

import { Container, Item, OptionText } from './styles';

export function ReleasesFilter(): JSX.Element {
  const navigation = useNavigation();

  const { customers, refresh: refreshCustomers } = useContext(CustomersContext);
  const {
    activeFilter,
    setActiveFilter,
    refresh: refreshReleases,
    customerFilter,
    setCustomerFilter,
  } = useContext(ReleasesContext);

  const cleanFilters = useCallback(async () => {
    setActiveFilter(false);
    setCustomerFilter('');
    await AsyncStorage.setItem('activeFilter', 'false');
    await AsyncStorage.setItem('customerFilter', '');
  }, [setActiveFilter, setCustomerFilter]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-remove-outline"
          onPress={cleanFilters}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [cleanFilters, navigation]);

  const onChange = useCallback(
    async (value: boolean) => {
      setActiveFilter(value);
      await refreshReleases();
      await AsyncStorage.setItem('activeFilter', value ? 'true' : 'false');
    },
    [refreshReleases, setActiveFilter],
  );

  const onCustomerChange = useCallback(
    async (value: string | number) => {
      setCustomerFilter(value as string);
      await refreshReleases();
      await AsyncStorage.setItem('customerFilter', String(value));
    },
    [refreshReleases, setCustomerFilter],
  );

  useEffect(() => {
    refreshCustomers();
  }, [refreshCustomers]);

  return (
    <Container>
      <Item>
        <OptionText>Exibir apenas lançamentos ativos e futuros</OptionText>
        <Switch onValueChange={onChange} value={activeFilter} />
      </Item>

      <Item style={{ marginTop: 10 }}>
        <OptionText>Exibir apenas lançamentos de: </OptionText>
        <Picker
          value={customerFilter}
          doneText="Selecionar"
          onChange={onCustomerChange}
          items={[
            { label: 'Todos', value: '' },
            ...customers.map(customer => ({
              label: customer.name,
              value: customer.id,
            })),
          ]}
          containerStyle={{ alignItems: 'flex-end' }}
          inputMode={false}
        />
      </Item>
    </Container>
  );
}
