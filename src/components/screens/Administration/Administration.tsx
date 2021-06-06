import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from 'hooks';

import { CircularButton } from 'components';

import { UsersList } from './UsersList';

import { Container } from './styles';

export function Administration(): JSX.Element {
  const { user } = useAuth();

  const navigation = useNavigation();

  return (
    <>
      <Container>
        <UsersList />
      </Container>
      {user.permission === 'admin' && (
        <CircularButton
          name="account-plus-outline"
          onPress={() =>
            navigation.navigate('AdministrationStack', {
              screen: 'UserForm',
            })
          }
        />
      )}
    </>
  );
}
