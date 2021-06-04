import { useEffect } from 'react';
import { Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useAuth } from 'hooks';

type Params = {
  Loggout: {
    code: string;
  };
};

type Props = StackScreenProps<Params, 'Loggout'>;

export function Loggout({ route }: Props): JSX.Element | null {
  const { signOut } = useAuth();

  useEffect(() => {
    if (route.params.code === 'token.expired') {
      Alert.alert('Sessão expirada!', 'Realize a autenticação novamente.');
      signOut();
    }
  });

  return null;
}
