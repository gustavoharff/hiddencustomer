import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Avatar, EmptyList, Swipeable } from 'components';

import { COLORS, SPACING } from 'styles';

import { useAuth } from 'hooks';

import { api } from 'services';

import { User } from 'types';

import { Container, Name, Email, UserInfo, Content } from './styles';

interface UsersListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export function UsersList({ setUsers, users }: UsersListProps): JSX.Element {
  const navigation = useNavigation();
  const { user: authenticateUser } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const handleActiveUser = useCallback(
    async (userId: string) => {
      async function active() {
        const response = await api.put(`/users/${userId}`, {
          active: true,
        });

        setUsers(state =>
          state.map(user => (user.id === userId ? response.data : user)),
        );
      }

      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo ativar este usuário?', [
          {
            text: 'Cancelar',
            onPress: () => resolve(200),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await active();
              return resolve(200);
            },
          },
        ]);
      });
    },
    [setUsers],
  );

  const handleDisableUser = useCallback(
    async (userId: string) => {
      async function disable() {
        const response = await api.put(`/users/${userId}`, {
          active: false,
        });

        setUsers(state =>
          state.map(user => (user.id === userId ? response.data : user)),
        );
      }

      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo desativar este usuário?', [
          {
            text: 'Cancelar',
            onPress: () => resolve(200),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await disable();
              return resolve(200);
            },
          },
        ]);
      });
    },
    [setUsers],
  );

  const handleRefresh = async () => {
    setRefreshing(true);

    const response = await api.get('/users');
    setUsers(response.data.filter((u: User) => u.id !== authenticateUser.id));

    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Nenhum usuário cadastrado." />}
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
              activeOption={!user.active}
              activeOnPress={async () => {
                await handleActiveUser(user.id);
              }}
              disableOption={user.active}
              disableOnPress={async () => {
                await handleDisableUser(user.id);
              }}
              editOption
              editOnPress={() => {
                navigation.navigate('AdministrationStack', {
                  screen: 'UserForm',
                  params: {
                    user,
                    setUsers,
                  },
                });
              }}
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
                  <Email numberOfLines={1}>{user.email}</Email>
                  <Email numberOfLines={1}>{user.company?.name}</Email>
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
}
