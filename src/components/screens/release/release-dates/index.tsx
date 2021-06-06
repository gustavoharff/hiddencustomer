import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { useAuth, ReleasesDatesContext } from 'hooks';

import { Release } from 'types';

import { ReleaseDatesList } from '../../../features/release-dates-list';

import { Container } from './styles';

interface ReleaseDatedProps {
  release: Release;
}

export function ReleaseDates({ release }: ReleaseDatedProps): JSX.Element {
  const { refresh } = useContext(ReleasesDatesContext);

  useEffect(() => {
    refresh(release.id);
  }, [refresh, release.id]);

  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ReleaseDatesList release_id={release.id} />

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
