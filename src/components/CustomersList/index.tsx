import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import produce from 'immer';
import moment from 'moment';
import 'moment/locale/pt-br';

import DeleteItem from '../DeleteItem';

import { Customer } from '../../schemas/customer';

import EmptyList from '../EmptyList';

import api from '../../services/api';

import { Container, UpdatedAt, Name, UpdatedAtText } from './styles';
import getRealm from '../../services/realm';

interface CustomersListProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

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
            tintColor="rgba(255,255,255,0.75)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={customers}
        renderItem={({ item: customer, index }) => (
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
            <Container>
              <Name>{customer.name}</Name>
              <UpdatedAt>
                <UpdatedAtText>
                  Atualizado{' '}
                  {moment(customer.updated_at).locale('pt-br').fromNow()}
                </UpdatedAtText>
                <UpdatedAtText />
              </UpdatedAt>
            </Container>
          </Swipeable>
        )}
      />
    </View>
  );
};

export { CustomersList };
