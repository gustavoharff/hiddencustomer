import React, { createContext, useState, useContext, useCallback } from 'react';

import { api, getRealm } from 'services';

import { User } from 'types';

type UsersContextData = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loadApiUsers: (userId: string) => Promise<void>;
  loadLocalUsers: () => Promise<void>;
};

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const loadApiUsers = useCallback(async (userId: string) => {
    const response = await api.get('/users');

    setUsers(response.data.filter((u: User) => u.id !== userId));

    const realm = await getRealm();

    console.log(realm.path);

    realm.write(() => {
      const data = realm.objects('User');
      realm.delete(data);

      response.data.map((user: User) => realm.create('User', user));
    });
  }, []);

  const loadLocalUsers = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<User>('User').sorted('name', true);

    const formattedUsers = data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      permission: user.permission,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    setUsers(formattedUsers);
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        loadApiUsers,
        loadLocalUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

function useUsers(): UsersContextData {
  const context = useContext(UsersContext);

  return context;
}

export { UsersProvider, useUsers };
