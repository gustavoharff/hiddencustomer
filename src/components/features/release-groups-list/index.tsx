import React, { useCallback, useContext, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import moment from 'moment';

import { EmptyList, Swipeable } from 'components';

import { SPACING } from 'styles';

import { ReleasesGroupsContext, useAuth } from 'hooks';

import { Container, Content, Description, Title } from './styles';

interface ReleaseGroupsListProps {
  release_id: string;
}

export function ReleaseGroupsList({
  release_id,
}: ReleaseGroupsListProps): JSX.Element {
  const { groups, refresh, deleteReleseGroup } = useContext(
    ReleasesGroupsContext,
  );

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const { user } = useAuth();

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
              await deleteReleseGroup(groupId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteReleseGroup],
  );

  const renderIcon = useCallback((type: string) => {
    switch (type) {
      case 'discord': {
        return <Icon name="discord" color="#7289d9" size={SPACING.L * 1.5} />;
      }
      case 'telegram': {
        return <Icon name="telegram" color="#0088cc" size={SPACING.L * 1.5} />;
      }
      case 'whatsapp': {
        return <Icon name="whatsapp" color="#25D366" size={SPACING.L * 1.5} />;
      }
      default:
        return undefined;
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    await refresh(release_id);

    setRefreshing(false);
  }, [refresh, release_id]);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Não há grupos cadastrados!" />}
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
                navigation.navigate('ReleaseGroupForm', {
                  type: 'update',
                  group,
                  release_id: group.release_id,
                })
              }
              deleteOption={
                user.permission === 'admin' || user.permission === 'client'
              }
              deleteOnPress={async () => {
                await onDeleteItem(group.id);
              }}
            >
              <RectButton>
                <Content>
                  <View>
                    <Title>{group.name}</Title>
                    {group.release_date?.id && (
                      <Description>
                        {moment(group.release_date.date).format('LL LT')}
                      </Description>
                    )}
                  </View>

                  {renderIcon(group.type)}
                </Content>
              </RectButton>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
