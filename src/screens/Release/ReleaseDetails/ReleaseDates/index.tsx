import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { useAuth } from 'hooks';

import { Release } from 'types';

import { ReleaseDatesList } from './ReleaseDatesList';

import { Container } from './styles';

interface ReleaseDatedProps {
  release: Release;
}

export function ReleaseDates({ release }: ReleaseDatedProps): JSX.Element {
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ReleaseDatesList
        emptyListText="Não há datas cadastradas!"
        release_id={release.id}
      />

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="calendar-plus"
          onPress={() =>
            navigation.navigate('ReleaseDateForm', {
              release_id: release.id,
            })
          }
        />
      )}
    </Container>
  );
}
