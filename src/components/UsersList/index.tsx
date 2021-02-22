import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import produce from 'immer';
import 'moment/locale/pt-br';

import api from '../../services/api';

import User from '../../schemas/user';

import EmptyList from '../EmptyList';

import DeleteItem from '../DeleteItem';

import { Avatar } from '../Avatar';

import { SPACING } from '../../styles/tokens';

import {
  Container,
  UpdatedAt,
  Name,
  Email,
  UpdatedAtText,
  Content,
} from './styles';

interface UsersListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

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
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={users}
        renderItem={({ item: user, index }) => (
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
            <Container>
              <Avatar
                size={SPACING.M * 5}
                url={
                  user.avatar_url ||
                  'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                }
              />
              <Content>
                <Name>{user.name}</Name>
                <Email>{user.email}</Email>
                <UpdatedAt>
                  <UpdatedAtText>
                    Atualizado{' '}
                    {moment(user.updated_at)
                      .utc(true)
                      .locale('pt-br')
                      .fromNow()}
                  </UpdatedAtText>
                  <UpdatedAtText />
                </UpdatedAt>
              </Content>
            </Container>
          </Swipeable>
        )}
      />
    </View>
  );
};

export { UsersList };
