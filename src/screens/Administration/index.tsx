import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from 'styles';

import { useAuth, useUsers } from 'hooks';

import { BottomButton } from 'components';

import { UsersList } from './UsersList';

import { Container, Center } from './styles';

export function Administration(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { loadApiUsers, loadLocalUsers } = useUsers();

  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    loadApiUsers(user.id)
      .catch(() => loadLocalUsers())
      .finally(() => setLoading(false));
  }, [loadApiUsers, user.id, loadLocalUsers]);

  const onRefresh = useCallback(async () => {
    try {
      await loadApiUsers(user.id);
    } catch {
      await loadLocalUsers();
    }
  }, [user.id, loadApiUsers, loadLocalUsers]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator
          color={Platform.OS === 'ios' ? COLORS.BACKGROUND_LIGHT : COLORS.ALERT}
          size={30}
        />
      </Center>
    );
  }

  return (
    <>
      <Container>
        <Container>
          <UsersList
            onRefresh={onRefresh}
            emptyListText="Nenhum usuário cadastrado."
          />
        </Container>
      </Container>
      {user.permission === 'admin' && (
        <BottomButton
          name="plus"
          onPress={() => navigation.navigate('UserForm')}
        />
      )}
    </>
  );
}
