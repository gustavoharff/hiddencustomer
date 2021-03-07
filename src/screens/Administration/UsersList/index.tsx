import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import produce from 'immer';

import { api } from 'services';

import { Avatar, EmptyList, DeleteItem } from 'components';

import { User } from 'types';

import { COLORS, SPACING } from 'styles';

import { Container, Name, Email, UserInfo, Content } from './styles';

type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  setUsers,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<User>({} as User);

  const handleDelete = useCallback(async () => {
    await api.delete(`/users/${selectedUser.id}`);
    setUsers(
      produce(users, drafts =>
        drafts.filter(draft => draft.id !== selectedUser.id),
      ),
    );
  }, [setUsers, users, selectedUser.id]);

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
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(255,255,255,0.75)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.ALERT]}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={users}
        renderItem={({ item: user, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
            ref={ref => (row[index] = ref)} // eslint-disable-line
              friction={1.5}
              rightThreshold={30}
              renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
              activeOffsetX={-1}
              activeOffsetY={500}
              onSwipeableOpen={() => {
                closeRow(index);
                setSelectedUser(user);
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
