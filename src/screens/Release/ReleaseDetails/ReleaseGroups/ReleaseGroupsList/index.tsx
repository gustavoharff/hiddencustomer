import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { EmptyList, Swipeable } from 'components';

import { SPACING } from 'styles';

import { useAuth, useReleases } from 'hooks';

import { ReleaseGroup } from 'types';

import moment from 'moment';
import { Container, Content, Description, Title } from './styles';

interface ReleaseGroupsListProps {
  emptyListText: string;
  release_id: string;
}

export function ReleaseGroupsList({
  emptyListText,
  release_id,
}: ReleaseGroupsListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const { user } = useAuth();

  const { releases, deleteReleaseGroup, loadApiReleaseGroups } = useReleases();

  const groups = useMemo(() => {
    const releaseGroups = [] as ReleaseGroup[];

    const releaseFiltered = releases.filter(
      release => release_id === release.id,
    );

    releaseFiltered.map(release => {
      return release.groups.forEach(group => {
        releaseGroups.push(group);
      });
    });

    return releaseGroups.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }, [release_id, releases]);

  const onRefresh = useCallback(async () => {
    loadApiReleaseGroups(release_id);
  }, [loadApiReleaseGroups, release_id]);

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
        data={groups}
        renderItem={({ item: group, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              editOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              editOnPress={() =>
                navigation.navigate('ReleaseGroupChange', {
                  release_id: group.release_id,
                  group_id: group.id,
                })
              }
              deleteOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              deleteOnPress={async () => {
                await onDeleteItem(group.id);
              }}
            >
              <Content>
                <View>
                  <Title>{group.name}</Title>
                  {releases
                    .find(release => release.id === group.release_id)
                    ?.dates.find(date => date.id === group.release_date_id)
                    ?.date && (
                    <Description>
                      {moment(
                        releases
                          .find(release => release.id === group.release_id)
                          ?.dates.find(
                            date => date.id === group.release_date_id,
                          )?.date,
                      ).format('LL LT')}
                    </Description>
                  )}
                </View>

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
