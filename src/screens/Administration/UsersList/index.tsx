import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { api } from 'services';

import { Avatar, EmptyList, ActivateItem, DisableItem } from 'components';

import { COLORS, SPACING } from 'styles';

import { useUsers } from 'hooks';

import { Container, Name, Email, UserInfo, Content } from './styles';

type UsersListProps = {
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const UsersList: React.FC<UsersListProps> = ({ onRefresh, emptyListText }) => {
  const { users, setUsers } = useUsers();

  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const handleActivate = useCallback(
    async (userId: string) => {
      const response = await api.put(`/users/${userId}`, {
        active: true,
      });

      setUsers(users.map(u => (u.id === response.data.id ? response.data : u)));
    },
    [setUsers, users],
  );

  const handleDisable = useCallback(
    async (userId: string) => {
      const response = await api.put(`/users/${userId}`, {
        active: false,
      });

      setUsers(users.map(u => (u.id === response.data.id ? response.data : u)));
    },
    [setUsers, users],
  );

  const onActivateItem = useCallback(
    (userId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo ativar este usuário?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            prevOpenedRow.close();
            handleActivate(userId);
          },
        },
      ]);
    },
    [prevOpenedRow, handleActivate],
  );

  const onDisableItem = useCallback(
    (userId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo desativar este usuário?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            prevOpenedRow.close();
            handleDisable(userId);
          },
        },
      ]);
    },
    [prevOpenedRow, handleDisable],
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
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={users}
        renderItem={({ item: user, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              ref={ref => {
                row[index] = ref;
              }}
              friction={1.5}
              rightThreshold={30}
              renderRightActions={() => {
                if (!user.active) {
                  return (
                    <ActivateItem
                      onPress={() => {
                        onActivateItem(user.id);
                      }}
                    />
                  );
                }

                return (
                  <DisableItem
                    onPress={() => {
                      onDisableItem(user.id);
                    }}
                  />
                );
              }}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => closeRow(index)}
            >
              <Content>
                <Avatar
                  size={SPACING.M * 5}
                  url={
                    user.avatar_url ||
                    'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                  }
                />
                <UserInfo>
                  <Name>{user.name}</Name>
                  <Email>{user.email}</Email>
                  <Email>{user.company?.name}</Email>
                </UserInfo>
                <Icon
                  name={user.active ? 'check' : 'close'}
                  color={user.active ? COLORS.SUCCESS : COLORS.ALERT}
                  size={SPACING.L * 1.5}
                  style={{ marginRight: SPACING.S }}
                />
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
};

export { UsersList };
