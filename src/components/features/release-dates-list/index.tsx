import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { useAuth } from 'hooks';

import { ReleaseDate } from 'types';

import { api } from 'services';

import { Container, Content, Date } from './styles';

type ReleaseDatesListProps = {
  release_id: string;
  dates: ReleaseDate[];
  setDates: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
};

export function ReleaseDatesList({
  release_id,
  dates,
  setDates,
}: ReleaseDatesListProps): JSX.Element {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const onDeleteItem = useCallback(
    async (dateId: string) => {
      async function remove() {
        await api.delete(`/release/dates/${dateId}`);

        setDates(state => state.filter(date => date.id !== dateId));
      }
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
              await remove();
              return resolve(200);
            },
          },
        ]);
      });
    },
    [setDates],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.get(`release/dates/${release_id}`);

    setDates(response.data);

    setRefreshing(false);
  }, [release_id, setDates]);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Não há datas cadastradas!" />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0, 0, 0, 0.5)"
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={dates}
        renderItem={({ item: date, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              deleteOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              deleteOnPress={async () => {
                await onDeleteItem(date.id);
              }}
            >
              <RectButton
                onPress={() =>
                  navigation.navigate('ReleaseDateGroups', { date_id: date.id })
                }
              >
                <Content past={moment(date.date).isSameOrBefore()}>
                  <Date>{moment(date.date).locale('pt-br').format('LLL')}</Date>
                </Content>
              </RectButton>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
