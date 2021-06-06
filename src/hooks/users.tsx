import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { UpdateMode } from 'realm';

import { api, getRealm } from 'services';

import { User } from 'types';
import { AuthContext } from './auth';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  company_id: string;
  permission: string;
}

interface UpdateUserData {
  user_id: string;
  company_id: string;
  email: string;
  name: string;
  active: boolean;
  password?: string;
  permission: string;
}

interface UsersContextData {
  users: User[];
  refresh: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<void>;
  updateUser: (data: UpdateUserData) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersContext = createContext<UsersContextData>(
  {} as UsersContextData,
);

export function UsersProvider({ children }: UsersProviderProps): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const { user: authUser } = useContext(AuthContext);

  const refresh = useCallback(async () => {
    const realm = await getRealm();

    try {
      const response = await api.get<User[]>('/users');

      setUsers(response.data.filter((u: User) => u.id !== authUser.id));

      realm.write(() => {
        const data = realm.objects('User');

        realm.delete(data);

        response.data.forEach(user => realm.create('User', user));
      });
    } catch {
      realm.write(() => {
        const data = realm.objects<User>('User');

        setUsers(
          data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            active: user.active,
            permission: user.permission,
            avatar_url: user.avatar_url,
            company: user.company,
            company_id: user.company_id,
            created_at: user.created_at,
            updated_at: user.updated_at,
          })),
        );
      });
    }
  }, [authUser?.id]);

  const createUser = useCallback(
    async ({
      name,
      email,
      password,
      company_id,
      permission,
    }: CreateUserData) => {
      const realm = await getRealm();

      const response = await api.post('/users', {
        name,
        email,
        password,
        company_id,
        permission,
      });

      setUsers(state => [response.data, ...state]);

      realm.write(() => {
        realm.create('User', response.data, UpdateMode.All);
      });
    },
    [],
  );

  const updateUser = useCallback(
    async ({
      user_id,
      name,
      email,
      password,
      permission,
      active,
      company_id,
    }: UpdateUserData) => {
      const response = await api.put(`/users/${user_id}`, {
        name,
        email,
        password,
        permission,
        active,
        company_id,
      });

      setUsers(state =>
        state.map(user => (user.id === user_id ? response.data : user)),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.create('User', response.data, UpdateMode.Modified);
      });
    },
    [],
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        refresh,
        createUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
