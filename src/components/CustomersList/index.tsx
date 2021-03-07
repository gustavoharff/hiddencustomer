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

const CustomersList: React.FC<CustomersListProps> = ({
  customers,
  setCustomers,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer,
  );

  const handleDelete = useCallback(async () => {
    await api.delete(`/customers/${selectedCustomer.id}`);
    setCustomers(
      produce(customers, drafts =>
        drafts.filter(draft => draft.id !== selectedCustomer.id),
      ),
    );

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Customer', selectedCustomer.id));
    });
  }, [selectedCustomer, setCustomers, customers]);

  const onDeleteItem = useCallback(() => {
    Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
      {
        text: 'Cancelar',
        onPress: () => prevOpenedRow.close(),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => handleDelete() },
    ]);
  }, [prevOpenedRow, handleDelete]);

  const closeRow = useCallback(
    index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      setPrevOpenedRow(row[index]);
    },
    [prevOpenedRow, row],
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
            ref={ref => (row[index] = ref)} // eslint-disable-line
              friction={1.5}
              rightThreshold={30}
              renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => {
                closeRow(index);
                setSelectedCustomer(customer);
              }}
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
};

export { CustomersList };
