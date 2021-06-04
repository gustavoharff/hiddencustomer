import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { Release, ReleaseGroup } from 'types';

import { useAuth } from 'hooks';

import { api } from 'services';

import { ReleaseGroupsList } from '../../../features/release-groups-list';

import { Container } from './styles';

interface ReleaseGroupsProps {
  release: Release;
}

export function ReleaseGroups({ release }: ReleaseGroupsProps): JSX.Element {
  const [groups, setGroups] = useState<ReleaseGroup[]>([]);
  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    api.get(`/release/groups/${release.id}`).then(response => {
      setGroups(response.data);
    });
  }, [release.id]);

  return (
    <Container>
      <ReleaseGroupsList
        release_id={release.id}
        groups={groups}
        setGroups={setGroups}
      />

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="account-multiple-plus-outline"
          onPress={() =>
            navigation.navigate('ReleaseGroupForm', {
              type: 'create',
              release_id: release.id,
              setGroups,
            })
          }
        />
      )}
    </Container>
  );
}
