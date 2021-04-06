import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

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

  const navigation = useNavigation();

  const { customers, deleteCustomer } = useCustomers();

  const onDeleteItem = useCallback(
    async (customerId: string) => {
      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
          {
            text: 'Cancelar',
            onPress: () => {
              return resolve(200);
            },
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await deleteCustomer(customerId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteCustomer],
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
              editOption
              editOnPress={() => {
                navigation.navigate('CustomerChange', {
                  customer_id: customer.id,
                });
              }}
              deleteOption
              deleteOnPress={async () => {
                await onDeleteItem(customer.id);
              }}
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
