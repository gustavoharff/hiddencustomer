import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { useAuth, useCustomers, useReleases } from 'hooks';

import { Container, Description, Content, Title, Item } from './styles';

interface CustomersListProps {
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

export function CustomersList({
  onRefresh,
  emptyListText,
}: CustomersListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const { customers, deleteCustomer } = useCustomers();
  const { releases } = useReleases();
  const { user } = useAuth();

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
              editOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              editOnPress={() => {
                navigation.navigate('CustomerForm', {
                  customer,
                });
              }}
              deleteOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              deleteOnPress={async () => {
                await onDeleteItem(customer.id);
              }}
            >
              <Content>
                <Description style={{ marginTop: 0 }} numberOfLines={2}>
                  {customer.name}
                </Description>
                <Item>
                  <Title>Lançamentos</Title>
                  <Description>
                    {
                      releases.filter(
                        release => release.customer_id === customer.id,
                      ).length
                    }
                  </Description>
                </Item>
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
