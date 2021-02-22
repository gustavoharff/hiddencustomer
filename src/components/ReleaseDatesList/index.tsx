import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import produce from 'immer';
import 'moment/locale/pt-br';

import { EmptyList, DeleteItem } from 'components';

import { api, getRealm } from 'services';

import { ReleaseDate } from 'types';

import { Container, Date } from './styles';

interface ReleaseDatesListProps {
  dates: ReleaseDate[];
  setDates: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

const ReleaseDatesList: React.FC<ReleaseDatesListProps> = ({
  dates,
  setDates,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<ReleaseDate>(
    {} as ReleaseDate,
  );

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/release/dates/${selectedDate.id}`);
      setDates(
        produce(dates, drafts =>
          drafts.filter(draft => draft.id !== selectedDate.id),
        ),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('ReleaseDate', selectedDate.id));
      });
    } catch (err) {
      Alert.alert('Erro!', 'Ocorreu um erro , reporte aos desenvolvedores!');
      prevOpenedRow.close();
    }
    await onRefresh();
  }, [dates, setDates, selectedDate.id, prevOpenedRow, onRefresh]);

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
    <View style={{ flex: 1, width: '100%' }}>
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
        data={dates}
        renderItem={({ item: date, index }) => (
          <Swipeable
            ref={ref => (row[index] = ref)} // eslint-disable-line
            friction={1.5}
            rightThreshold={30}
            renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
            activeOffsetX={-1}
            activeOffsetY={500}
            onSwipeableOpen={() => {
              closeRow(index);
              setSelectedDate(date);
            }}
          >
            <Container>
              <Date past={moment(date.date).isSameOrBefore()}>
                {moment(date.date).locale('pt-br').format('LLL')}
              </Date>
            </Container>
          </Swipeable>
        )}
      />
    </View>
  );
};

export { ReleaseDatesList };
