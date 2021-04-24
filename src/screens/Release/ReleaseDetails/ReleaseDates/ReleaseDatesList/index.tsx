import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { useAuth, useReleases } from 'hooks';

import { ReleaseDate } from 'types';
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

  const { user } = useAuth();

  const { deleteReleaseDate, releases, loadApiReleaseDates } = useReleases();

  const dates = useMemo(() => {
    const releaseDates = [] as ReleaseDate[];
    const releaseFiltered = releases.filter(
      release => release_id === release.id,
    );

    releaseFiltered.map(release => {
      return release.dates.forEach(date => {
        releaseDates.push(date);
      });
    });

    return releaseDates;
  }, [release_id, releases]);

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
    await loadApiReleaseDates(release_id);
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
