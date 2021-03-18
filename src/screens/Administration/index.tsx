import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';

import { COLORS } from 'styles';

import { User } from 'types';

import { api } from 'services';

import { useAuth } from 'hooks';

import { BottomButton } from 'components';
import { UsersList } from './UsersList';

import { Container, Center } from './styles';

const Administration: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    api
      .get('/users')
      .then(response => {
        setUsers(response.data.filter((u: User) => u.id !== user.id));
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const onRefresh = useCallback(async () => {
    const response = await api.get('/users');

    setUsers(response.data.filter((u: User) => u.id !== user.id));
  }, [user.id]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator
          color={Platform.OS === 'ios' ? COLORS.BACKGROUND_LIGHT : COLORS.ALERT}
          size={30}
        />
      </Center>
    );
  }

  return (
    <>
      <Container>
        <Container>
          <UsersList
            users={users}
            setUsers={setUsers}
            onRefresh={onRefresh}
            emptyListText="Nenhum usuário cadastrado."
          />
        </Container>
      </Container>
      {user.permission === 'admin' && (
        <BottomButton
          name="plus"
          // onPress={() => navigation.navigate('ReleaseForm')}
        />
      )}
    </>
  );
};

export { Administration };
