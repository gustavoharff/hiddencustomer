import React, { useCallback, useEffect, useState } from 'react';

import { User } from 'types';

import { ListHeader, UsersList } from 'components';

import { api } from 'services';

import { Container } from './styles';

const Administration: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const onRefresh = useCallback(async () => {
    const response = await api.get('/users');
    setUsers(response.data);
  }, []);

  return (
    <Container>
      <ListHeader title="Listagem de usuários" />

      <Container>
        <UsersList
          users={users}
          setUsers={setUsers}
          onRefresh={onRefresh}
          emptyListText="Nenhum usuário cadastrado."
        />
      </Container>
    </Container>
  );
};

export { Administration };
