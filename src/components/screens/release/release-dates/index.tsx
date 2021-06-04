import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { useAuth } from 'hooks';

import { Release, ReleaseDate } from 'types';

import { api } from 'services';

import { ReleaseDatesList } from '../../../features/release-dates-list';

import { Container } from './styles';

interface ReleaseDatedProps {
  release: Release;
}

export function ReleaseDates({ release }: ReleaseDatedProps): JSX.Element {
  const [dates, setDates] = useState<ReleaseDate[]>([]);

  useEffect(() => {
    api.get(`release/dates/${release.id}`).then(response => {
      setDates(response.data);
    });
  }, [release.id]);

  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ReleaseDatesList
        dates={dates}
        setDates={setDates}
        release_id={release.id}
      />

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="calendar-plus"
          onPress={() =>
            navigation.navigate('ReleaseDateForm', {
              release_id: release.id,
              setDates,
            })
          }
        />
      )}
    </Container>
  );
}
