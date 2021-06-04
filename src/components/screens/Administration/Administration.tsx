import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from 'hooks';

import { CircularButton } from 'components';

import { User } from 'types';

import { api } from 'services';
import { UsersList } from './UsersList';

import { Container } from './styles';

export function Administration(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    api.get<User[]>('/users').then(response => {
      setUsers(response.data.filter((u: User) => u.id !== user.id));
    });
  }, [user.id]);

  return (
    <>
      <Container>
        <UsersList users={users} setUsers={setUsers} />
      </Container>
      {user.permission === 'admin' && (
        <CircularButton
          name="account-plus-outline"
          onPress={() =>
            navigation.navigate('AdministrationStack', {
              screen: 'UserForm',
              params: {
                setUsers,
              },
            })
          }
        />
      )}
    </>
  );
}
