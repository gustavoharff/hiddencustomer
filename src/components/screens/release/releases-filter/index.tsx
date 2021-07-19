import React, { useCallback, useContext, useEffect } from 'react';
import { Switch, View } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomersContext, ReleasesContext } from 'hooks';

import { Picker } from 'components';

import { Body, HeaderIcon } from 'components/ui';
import { SPACING } from 'styles';
import {
  Container,
  Header,
  Knob,
  Item,
  OptionText,
  KnobContainer,
} from './styles';

interface ReleasesFilterProps {
  isVisible: boolean;
  closeFilters: () => void;
}

export function ReleasesFilter({
  isVisible,
  closeFilters,
}: ReleasesFilterProps): JSX.Element {
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
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onBackdropPress={closeFilters}
      onSwipeComplete={closeFilters}
      onBackButtonPress={closeFilters}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Header>
        <HeaderIcon
          name="filter-remove-outline"
          onPress={() => {
            cleanFilters();
            closeFilters();
          }}
          style={{ marginLeft: 16, marginTop: 16 }}
        />
        <View>
          <KnobContainer>
            <Knob onPress={closeFilters} />
          </KnobContainer>
          <Body bold dark center style={{ marginVertical: 10 }}>
            Filtros
          </Body>
        </View>

        <HeaderIcon
          name="filter-remove-outline"
          onPress={() => null}
          style={{ opacity: 0, marginLeft: 16, marginTop: 16 }}
        />
      </Header>
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
    </Modal>
  );
}
