import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import produce from 'immer';
import 'moment/locale/pt-br';

import { EmptyList, DeleteItem } from 'components';

import { api, getRealm } from 'services';

import { ReleaseDate } from 'types';

import { Container, Content, Date } from './styles';

type ReleaseDatesListProps = {
  dates: ReleaseDate[];
  setDates: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const ReleaseDatesList: React.FC<ReleaseDatesListProps> = ({
  dates,
  setDates,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

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
        prevOpenedRow.close();
        await onRefresh();
      }
    },
    [setDates, prevOpenedRow, onRefresh],
  );

  const onDeleteItem = useCallback(
    async (dateId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => handleDelete(dateId) },
      ]);
    },
    [prevOpenedRow, handleDelete],
  );

  const closeRow = useCallback(
    index => {
      setPrevOpenedRow(row[index]);
    },
    [row],
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
              ref={ref => {
                row[index] = ref;
              }}
              friction={1.5}
              rightThreshold={30}
              renderRightActions={() => (
                <DeleteItem
                  onPress={() => {
                    onDeleteItem(date.id);
                  }}
                />
              )}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => closeRow(index)}
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
};

export { ReleaseDatesList };
