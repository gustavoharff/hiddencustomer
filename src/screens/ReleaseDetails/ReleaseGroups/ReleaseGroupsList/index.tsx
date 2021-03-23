import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EmptyList, DeleteItem } from 'components';

import { ReleaseGroup } from 'types';

import { SPACING } from 'styles';

import { useGroups } from 'hooks';
import { Container, Content, Description } from './styles';

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
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const { deleteGroup } = useGroups();

  const onDeleteItem = useCallback(
    (groupId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => deleteGroup(groupId) },
      ]);
    },
    [prevOpenedRow, deleteGroup],
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
        data={groups}
        renderItem={({ item: group, index }) => (
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
                    onDeleteItem(group.id);
                  }}
                />
              )}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => closeRow(index)}
            >
              <Content>
                <Description>{group.name}</Description>

                {group.type === 'discord' && (
                  <Icon name="discord" color="#7289d9" size={SPACING.L * 1.5} />
                )}
                {group.type === 'whatsapp' && (
                  <Icon
                    name="whatsapp"
                    color="#25D366"
                    size={SPACING.L * 1.5}
                  />
                )}
                {group.type === 'telegram' && (
                  <Icon
                    name="telegram"
                    color="#0088cc"
                    size={SPACING.L * 1.5}
                  />
                )}
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
};

export { ReleaseGroupsList };
