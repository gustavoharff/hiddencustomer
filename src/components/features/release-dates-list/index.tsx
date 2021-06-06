import React, { useCallback, useContext } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/pt-br';

import { EmptyList, Swipeable } from 'components';

import { ReleasesDatesContext, useAuth } from 'hooks';

import { Container, Content, Date } from './styles';

type ReleaseDatesListProps = {
  release_id: string;
};

export function ReleaseDatesList({
  release_id,
}: ReleaseDatesListProps): JSX.Element {
  const navigation = useNavigation();

  const { user } = useAuth();

  const { dates, refresh, refreshing, deleteReleseDate } = useContext(
    ReleasesDatesContext,
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
              await deleteReleseDate(dateId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteReleseDate],
  );

  const onRefresh = useCallback(async () => {
    await refresh(release_id);
  }, [refresh, release_id]);

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
