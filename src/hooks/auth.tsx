import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User, Auth } from 'types';

import { api, getRealm } from 'services';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const realm = await getRealm();

      realm.write(() => {
        const [user] = realm.objects<Auth>('Auth');

        if (user && user.token) {
          const formatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            permission: user.permission,
            active: user.active,
            token: user.token,
            company_id: user.company_id,
            created_at: user.created_at,
            updated_at: user.updated_at,
          };

          api.defaults.headers.authorization = `Bearer ${user.token}`;

          setData({ token: formatedUser.token, user: formatedUser });
        }
      });

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth', {
      email,
      password,
    });
    const { token, user } = response.data;

    const realm = await getRealm();

    const auth = {
      ...user,
      token,
    };

    realm.write(() => {
      realm.create('Auth', auth);
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error(e);
    }
    const realm = await getRealm();

    realm.write(() => {
      realm.deleteAll();
    });

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      const realm = await getRealm();

      realm.write(() => {
        const [authData] = realm.objects('Auth');

        realm.delete(authData);
      });

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        token: data.token,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
