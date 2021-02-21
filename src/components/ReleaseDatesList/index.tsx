import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

import EmptyList from '../EmptyList';

import { Container, Date } from './styles';
import { ReleaseDate } from '../../schemas/releaseDate';
import DeleteItem from '../DeleteItem';

interface ReleaseDatesListProps {
  dates: ReleaseDate[];
  setDates?: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

const ReleaseDatesList: React.FC<ReleaseDatesListProps> = ({
  dates,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<ReleaseDate>(
    {} as ReleaseDate,
  );

  // const handleDelete = useCallback(async () => {
  //   await api.delete(`/customers/${selectedCustomer.id}`);
  //   setCustomers(
  //     produce(customers, drafts =>
  //       drafts.filter(draft => draft.id !== selectedCustomer.id),
  //     ),
  //   );

  //   const realm = await getRealm();

  //   realm.write(() => {
  //     realm.delete(realm.objectForPrimaryKey('Customer', selectedCustomer.id));
  //   });
  // }, [selectedCustomer, setCustomers, customers]);

  // const onDeleteItem = useCallback(() => {
  //   Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
  //     {
  //       text: 'Cancelar',
  //       onPress: () => prevOpenedRow.close(),
  //       style: 'cancel',
  //     },
  //     { text: 'Sim', onPress: () => handleDelete() },
  //   ]);
  // }, [prevOpenedRow, handleDelete]);

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
            renderRightActions={() => (
              <DeleteItem onPress={() => console.log('delete')} />
            )}
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
