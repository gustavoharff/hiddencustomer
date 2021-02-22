import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { User, Auth } from 'types';

import { api, getRealm } from 'services';

type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  token: string;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const realm = await getRealm();

      realm.write(() => {
        const [user] = realm.objects<Auth>('Auth');

        if (user && user.token) {
          api.defaults.headers.authorization = `Bearer ${user.token}`;

          setData({ token: user.token, user });
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
        const authData = realm.objects('Auth');

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
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
