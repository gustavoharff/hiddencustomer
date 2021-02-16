import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

import Release from '../../schemas/release';

import EmptyList from '../EmptyList';

import { Container, Name, UpdatedAt, UpdatedAtText } from './styles';
import DeleteItem from '../DeleteItem';

interface ItemProps {
  items: Release[];
  setItems: React.Dispatch<React.SetStateAction<Release[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

const ReleasesList: React.FC<ItemProps> = ({
  items,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const onDeleteItem = useCallback(() => {
    Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
      {
        text: 'Cancelar',
        onPress: () => prevOpenedRow.close(),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => console.log('OK Pressed') },
    ]);
  }, [prevOpenedRow]);

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
    <View style={{ flex: 1 }}>
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
        data={items}
        renderItem={({ item, index }) => (
          <Swipeable
          ref={ref => (row[index] = ref)} // eslint-disable-line
            friction={1.5}
            rightThreshold={30}
            renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
            activeOffsetX={-1}
            activeOffsetY={500}
            onSwipeableOpen={() => closeRow(index)}
          >
            <Container>
              <Name>{item.name}</Name>
              <UpdatedAt>
                <UpdatedAtText>
                  Atualizado {moment(item.updated_at).locale('pt-br').fromNow()}
                </UpdatedAtText>
                <UpdatedAtText />
              </UpdatedAt>
            </Container>
          </Swipeable>
        )}
      />
    </View>
  );
};

export default ReleasesList;
