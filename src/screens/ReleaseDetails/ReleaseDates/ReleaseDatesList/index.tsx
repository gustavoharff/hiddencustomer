import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { useReleases } from 'hooks';
import { Container, Content, Date } from './styles';

type ReleaseDatesListProps = {
  emptyListText: string;
  release_id: string;
};

export function ReleaseDatesList({
  emptyListText,
  release_id,
}: ReleaseDatesListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const {
    releasesDates,
    deleteReleaseDate,
    loadApiReleasesDates,
  } = useReleases();

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
              await deleteReleaseDate(dateId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteReleaseDate],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadApiReleasesDates();
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
            onRefresh={onRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={releasesDates.filter(
          releaseDate => releaseDate.release_id === release_id,
        )}
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
