import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Avatar, EmptyList, Swipeable } from 'components';

import { COLORS, SPACING } from 'styles';

import { useCompanies, useUsers } from 'hooks';

import { Container, Name, Email, UserInfo, Content } from './styles';

type UsersListProps = {
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

export function UsersList({
  onRefresh,
  emptyListText,
}: UsersListProps): JSX.Element {
  const { users, activateUser, disableUser } = useUsers();
  const { companies } = useCompanies();

  const [refreshing, setRefreshing] = useState(false);

  const onActivateItem = useCallback(
    async (userId: string) => {
      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo ativar este usuário?', [
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
              await activateUser(userId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [activateUser],
  );

  const onDisableItem = useCallback(
    async (userId: string) => {
      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo desativar este usuário?', [
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
              await disableUser(userId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [disableUser],
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
              activeOption={!user.active}
              activeOnPress={async () => {
                await onActivateItem(user.id);
              }}
              disableOption={user.active}
              disableOnPress={async () => {
                await onDisableItem(user.id);
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
                  <Email>{user.email}</Email>
                  <Email>
                    {
                      companies.find(company => company.id === user.company_id)
                        ?.name
                    }
                  </Email>
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
