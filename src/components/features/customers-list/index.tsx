import React, { useCallback, useContext } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { useAuth, CustomersContext } from 'hooks';

import { Container, Description, Content, Title, Item } from './styles';

export function CustomersList(): JSX.Element {
  const navigation = useNavigation();

  const { customers, deleteCustomer, refresh, refreshing } = useContext(
    CustomersContext,
  );

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Nenhum cliente cadastrado." />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={refresh}
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
                navigation.navigate('CustomersStack', {
                  screen: 'CustomerForm',
                  params: {
                    customer,
                  },
                });
              }}
              deleteOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              deleteOnPress={async () => {
                await onDeleteItem(customer.id);
              }}
            >
              <RectButton
              // onPress={() => {
              //   setCustomerReleasesFilter(customer.id);
              //   if (Platform.OS === 'android') {
              //     ToastAndroid.showWithGravity(
              //       `Filtro para o cliente ${customer.name} aplicado!`,
              //       ToastAndroid.SHORT,
              //       ToastAndroid.CENTER,
              //     );
              //   }

              // navigation.navigate('Releases');
              // }}
              >
                <Content>
                  <Description style={{ marginTop: 0 }} numberOfLines={2}>
                    {customer.name}
                  </Description>
                  <Item>
                    <Title>Lançamentos</Title>
                    <Description>{customer.releases_counter}</Description>
                  </Item>
                </Content>
              </RectButton>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
