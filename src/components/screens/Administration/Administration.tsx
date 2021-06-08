import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth, UsersContext } from 'hooks';

import { CircularButton, Section } from 'components';

import { colors } from 'styles';

import { Container } from './styles';

import { UsersList } from './UsersList';

export function Administration(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { refresh } = useContext(UsersContext);

  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator color={colors.gray[700]} />
      </Section>
    );
  }

  return (
    <Container>
      <UsersList />

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
    </Container>
  );
}
