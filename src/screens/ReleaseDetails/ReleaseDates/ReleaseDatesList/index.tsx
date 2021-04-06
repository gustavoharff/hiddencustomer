import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import produce from 'immer';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { api, getRealm } from 'services';

import { ReleaseDate } from 'types';

import { Container, Content, Date } from './styles';

type ReleaseDatesListProps = {
  dates: ReleaseDate[];
  setDates: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

export function ReleaseDatesList({
  dates,
  setDates,
  onRefresh,
  emptyListText,
}: ReleaseDatesListProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = useCallback(
    async (dateId: string) => {
      try {
        await api.delete(`/release/dates/${dateId}`);
        setDates(state =>
          produce(state, drafts => drafts.filter(draft => draft.id !== dateId)),
        );

        const realm = await getRealm();

        realm.write(() => {
          realm.delete(realm.objectForPrimaryKey('ReleaseDate', dateId));
        });
      } catch (err) {
        Alert.alert('Erro!', 'Ocorreu um erro, reporte aos desenvolvedores!');

        await onRefresh();
      }
    },
    [setDates, onRefresh],
  );

  const onDeleteItem = useCallback(
    async (dateId: string) => {
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
              await handleDelete(dateId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [handleDelete],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0, 0, 0, 0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={dates}
        renderItem={({ item: date, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              deleteOption
              deleteOnPress={async () => {
                await onDeleteItem(date.id);
              }}
            >
              <Content past={moment(date.date).isSameOrBefore()}>
                <Date>{moment(date.date).locale('pt-br').format('LLL')}</Date>
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
