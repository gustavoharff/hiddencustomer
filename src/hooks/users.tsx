import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';

import { api, getRealm } from 'services';

import { User } from 'types';

import { useAuth } from 'hooks';

type UsersContextData = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loadApiUsers: (userId: string) => Promise<void>;
  loadLocalUsers: () => Promise<void>;
};

type UsersProviderProps = {
  children: ReactNode;
};

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const { signOut } = useAuth();

  const loadApiUsers = useCallback(
    async (userId: string) => {
      try {
        const response = await api.get('/users');

        setUsers(response.data.filter((u: User) => u.id !== userId));

        const realm = await getRealm();

        realm.write(() => {
          const data = realm.objects('User');
          realm.delete(data);

          response.data.map((user: User) => realm.create('User', user));
        });
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

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
}

export function useUsers(): UsersContextData {
  const context = useContext(UsersContext);

  return context;
}
