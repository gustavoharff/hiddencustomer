import React, { useCallback, useEffect } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCustomers, useReleases } from 'hooks';

import { HeaderIcon } from 'components';

import { SPACING } from 'styles';

import { Picker } from 'components/Picker';

import { Container, Item, OptionText } from './styles';

export function ReleasesFilter(): JSX.Element {
  const navigation = useNavigation();

  const { customers, loadApiCustomers, loadLocalCustomers } = useCustomers();

  const {
    activeReleasesFilter,
    setActiveReleasesFilter,
    setCustomerReleasesFilter,
    customerReleasesFilter,
  } = useReleases();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-remove-outline"
          onPress={() => {
            setActiveReleasesFilter(false);
            setCustomerReleasesFilter('all');
          }}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [navigation, setActiveReleasesFilter, setCustomerReleasesFilter]);

  const onChange = useCallback(
    async value => {
      setActiveReleasesFilter(value);
      await AsyncStorage.setItem('ReleaseActiveFilter', value ? '1' : '0');
    },
    [setActiveReleasesFilter],
  );

  const onCustomerChange = useCallback(
    async value => {
      setCustomerReleasesFilter(value);
      await AsyncStorage.setItem('CustomerReleasesFilter', value);
    },
    [setCustomerReleasesFilter],
  );

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
        <Switch onValueChange={onChange} value={activeReleasesFilter} />
      </Item>

      <Item style={{ marginTop: 10 }}>
        <OptionText>Exibir apenas lançamentos de: </OptionText>
        <Picker
          value={customerReleasesFilter}
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
