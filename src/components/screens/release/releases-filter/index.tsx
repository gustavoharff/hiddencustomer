import React, { useCallback, useContext, useEffect } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomersContext } from 'hooks';

import { HeaderIcon, Picker } from 'components';

import { SPACING } from 'styles';

import { Container, Item, OptionText } from './styles';

export function ReleasesFilter(): JSX.Element {
  const navigation = useNavigation();

  const { customers, refresh } = useContext(CustomersContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-remove-outline"
          onPress={() => {
            // console.log();
          }}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [navigation]);

  const onChange = useCallback(async () => {
    // console.log(value);
  }, []);

  const onCustomerChange = useCallback(async () => {
    // console.log(value);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
