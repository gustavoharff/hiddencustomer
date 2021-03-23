import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import 'moment/locale/pt-br';

import { DeleteItem, EmptyList } from 'components';

import { useCustomers } from 'hooks';

import { Container, Description, Content, Title, Item } from './styles';

type CustomersListProps = {
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

export function CustomersList({
  onRefresh,
  emptyListText,
}: CustomersListProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const { customers, deleteCustomer } = useCustomers();

  const onDeleteItem = useCallback(
    (customerId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => deleteCustomer(customerId) },
      ]);
    },
    [prevOpenedRow, deleteCustomer],
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
                  <Description>{customer.releases_counter}</Description>
                </Item>
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
