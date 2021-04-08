import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EmptyList, Swipeable } from 'components';

import { SPACING } from 'styles';

import { useReleases } from 'hooks';

import { Container, Content, Description } from './styles';

interface ReleaseGroupsListProps {
  emptyListText: string;
  release_id: string;
}

export function ReleaseGroupsList({
  emptyListText,
  release_id,
}: ReleaseGroupsListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const {
    releasesGroups,
    loadApiReleasesGroups,
    loadLocalReleasesGroups,
    deleteReleaseGroup,
  } = useReleases();

  const onRefresh = useCallback(async () => {
    loadApiReleasesGroups().catch(() => loadLocalReleasesGroups());
  }, [loadApiReleasesGroups, loadLocalReleasesGroups]);

  const onDeleteItem = useCallback(
    async (groupId: string) => {
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
              await deleteReleaseGroup(groupId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteReleaseGroup],
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
        data={releasesGroups.filter(group => group.release_id === release_id)}
        renderItem={({ item: group, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              deleteOption
              deleteOnPress={async () => {
                await onDeleteItem(group.id);
              }}
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
}
