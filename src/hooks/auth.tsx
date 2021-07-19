import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import Realm from 'realm';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { User, Auth } from 'types';

import { api } from 'services';
import { useRealm } from './realm';

GoogleSignin.configure({
  iosClientId:
    '407713481057-g72ok740aogh485qbb1qo6vqsr59fs4j.apps.googleusercontent.com',
  webClientId:
    '407713481057-iln18snjt9ehfm637d11cj2id9joo5hp.apps.googleusercontent.com',
  scopes: ['openid', 'email', 'profile'],
});

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
  googleSignIn(): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { realm } = useRealm();

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
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
            avatar_url: user.avatar_url,
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
    if (realm instanceof Realm) {
      loadStoragedData();
    }
  }, [realm]);

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('auth', {
        email,
        password,
      });
      const { token, user } = response.data;

      const auth = {
        ...user,
        token,
      };

      realm.write(() => {
        realm.create('Auth', auth);
      });

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });

      if (Platform.OS === 'android') {
        OneSignal.setEmail(user.email);
      }
    },
    [realm],
  );

  const googleSignIn = useCallback(async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();

    console.log(userInfo);

    try {
      const response = await api.post('auth/oauth', {
        googleToken: userInfo?.idToken,
      });

      const { token, user } = response.data;

      const auth = {
        ...user,
        token,
      };

      realm.write(() => {
        realm.create('Auth', auth);
      });

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });

      if (Platform.OS === 'android') {
        OneSignal.setEmail(user.email);
      }
    } catch (err) {
      if (err.response.status === 404) {
        Alert.alert('Atenção', 'Usuário não encontrado!');
      }
      console.log(err.response.data);
    }
  }, [realm]);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      //
    }

    realm.write(() => {
      realm.deleteAll();
    });

    setData({} as AuthState);
    if (Platform.OS === 'android') {
      OneSignal.logoutEmail();
    }
  }, [realm]);

  const updateUser = useCallback(
    async (user: User) => {
      realm.write(() => {
        const [authData] = realm.objects('Auth');

        realm.delete(authData);
      });

      setData({
        token: data.token,
        user,
      });
    },
    [data.token, realm],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        googleSignIn,
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
