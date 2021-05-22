import React, { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useAuth } from 'hooks';

type Params = {
  Loggout: {
    code: string;
  };
};

type Props = StackScreenProps<Params, 'Loggout'>;

export function Loggout({ route }: Props): JSX.Element {
  const { signOut } = useAuth();

  useEffect(() => {
    if (route.params.code === 'token.expired') {
      Alert.alert('Sessão expirada!', 'Realize a autenticação novamente.');
      signOut();
    }
  });

  return <ActivityIndicator />;
}
