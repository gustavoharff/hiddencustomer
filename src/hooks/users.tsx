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

interface UsersContextData {
  users: User[];
  loadApiUsers: (userId: string) => Promise<void>;
  loadLocalUsers: () => Promise<void>;
  createUser: (data: UserFormData) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
  disableUser: (userId: string) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  company_id: string;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps): JSX.Element {
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

  const createUser = useCallback(
    async ({ name, email, password, company_id }: UserFormData) => {
      const response = await api.post('/users', {
        name,
        email,
        password,
        company_id,
      });

      setUsers([response.data, ...users]);

      const realm = await getRealm();

      realm.write(() => {
        realm.create('User', response.data);
      });
    },
    [users],
  );

  const activateUser = useCallback(
    async (userId: string) => {
      const response = await api.put(`/users/${userId}`, {
        active: true,
      });

      setUsers(users.map(user => (user.id === userId ? response.data : user)));
    },
    [users],
  );

  const disableUser = useCallback(
    async (userId: string) => {
      const response = await api.put(`/users/${userId}`, {
        active: false,
      });

      setUsers(users.map(user => (user.id === userId ? response.data : user)));
    },
    [users],
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        loadApiUsers,
        loadLocalUsers,
        createUser,
        activateUser,
        disableUser,
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
