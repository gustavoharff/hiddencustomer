import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { Release } from 'types';

import { ReleasesGroupsContext, useAuth } from 'hooks';

import { ReleaseGroupsList } from '../../../features/release-groups-list';

import { Container } from './styles';

interface ReleaseGroupsProps {
  release: Release;
}

export function ReleaseGroups({ release }: ReleaseGroupsProps): JSX.Element {
  const navigation = useNavigation();
  const { refresh } = useContext(ReleasesGroupsContext);

  const { user } = useAuth();

  useEffect(() => {
    refresh(release.id);
  }, [refresh, release.id]);

  return (
    <Container>
      <ReleaseGroupsList release_id={release.id} />

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="account-multiple-plus-outline"
          onPress={() =>
            navigation.navigate('ReleaseGroupForm', {
              type: 'create',
              release_id: release.id,
            })
          }
        />
      )}
    </Container>
  );
}
