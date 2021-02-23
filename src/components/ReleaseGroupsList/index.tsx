import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import produce from 'immer';

import { EmptyList, DeleteItem } from 'components';

import { api, getRealm } from 'services';

import { ReleaseGroup } from 'types';

import { SPACING } from 'styles';

import { useGroups } from 'hooks';
import { Container, Name } from './styles';

type ReleaseGroupsListProps = {
  groups: ReleaseGroup[];
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const ReleaseGroupsList: React.FC<ReleaseGroupsListProps> = ({
  groups,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState<ReleaseGroup>(
    {} as ReleaseGroup,
  );

  const { setGroups } = useGroups();

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/release/groups/${selectedGroup.id}`);
      setGroups(
        produce(groups, drafts =>
          drafts.filter(draft => draft.id !== selectedGroup.id),
        ),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(
          realm.objectForPrimaryKey('ReleaseGroup', selectedGroup.id),
        );
      });
    } catch (err) {
      Alert.alert('Erro!', 'Ocorreu um erro , reporte aos desenvolvedores!');
      prevOpenedRow.close();
      await onRefresh();
    }
  }, [groups, setGroups, selectedGroup.id, prevOpenedRow, onRefresh]);

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
        data={groups}
        renderItem={({ item: group, index }) => (
          <Swipeable
            ref={ref => (row[index] = ref)} // eslint-disable-line
            friction={1.5}
            rightThreshold={30}
            renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
            activeOffsetX={-1}
            activeOffsetY={500}
            onSwipeableOpen={() => {
              closeRow(index);
              setSelectedGroup(group);
            }}
          >
            <Container>
              <Name>{group.name}</Name>
              {group.type === 'discord' && (
                <Icon name="discord" color="#7289d9" size={SPACING.L * 1.5} />
              )}
              {group.type === 'whatsapp' && (
                <Icon name="whatsapp" color="#25D366" size={SPACING.L * 1.5} />
              )}
              {group.type === 'telegram' && (
                <Icon name="telegram" color="#0088cc" size={SPACING.L * 1.5} />
              )}
            </Container>
          </Swipeable>
        )}
      />
    </View>
  );
};

export { ReleaseGroupsList };
