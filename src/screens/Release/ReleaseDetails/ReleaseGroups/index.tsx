import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { Release } from 'types';

import { useAuth } from 'hooks';
import { ReleaseGroupsList } from './ReleaseGroupsList';

import { Container } from './styles';

interface ReleaseGroupsProps {
  release: Release;
}

export function ReleaseGroups({ release }: ReleaseGroupsProps): JSX.Element {
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ReleaseGroupsList
        release_id={release.id}
        emptyListText="Não há grupos cadastrados!"
      />

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="account-multiple-plus-outline"
          onPress={() =>
            navigation.navigate('ReleaseGroupForm', {
              release_id: release.id,
            })
          }
        />
      )}
    </Container>
  );
}
