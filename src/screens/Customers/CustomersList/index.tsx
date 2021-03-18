import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import produce from 'immer';
import 'moment/locale/pt-br';

import { DeleteItem, EmptyList } from 'components';

import { Customer } from 'types';

import { api, getRealm } from 'services';

import { Container, Description, Content, Title, Item } from './styles';

type CustomersListProps = {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

export function CustomersList({
  customers,
  setCustomers,
  onRefresh,
  emptyListText,
}: CustomersListProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const handleDelete = useCallback(
    async (customerId: string) => {
      await api.delete(`/customers/${customerId}`);
      setCustomers(
        produce(customers, drafts =>
          drafts.filter(draft => draft.id !== customerId),
        ),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Customer', customerId));
      });
    },
    [setCustomers, customers],
  );

  const onDeleteItem = useCallback(
    (customerId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => handleDelete(customerId) },
      ]);
    },
    [prevOpenedRow, handleDelete],
  );

  const closeRow = useCallback(
    index => {
      setPrevOpenedRow(row[index]);
    },
    [row],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={customers}
        renderItem={({ item: customer, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              ref={ref => {
                row[index] = ref;
              }}
              friction={1.5}
              rightThreshold={30}
              renderRightActions={() => (
                <DeleteItem
                  onPress={() => {
                    onDeleteItem(customer.id);
                  }}
                />
              )}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => closeRow(index)}
            >
              <Content>
                <Description style={{ marginTop: 0 }}>
                  {customer.name}
                </Description>
                <Item>
                  <Title>Lançamentos</Title>
                  <Description>5</Description>
                </Item>
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
