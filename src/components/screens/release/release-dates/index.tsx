import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { useAuth, ReleasesDatesContext } from 'hooks';

import { Release } from 'types';

import { Section } from 'components/ui';

import { colors } from 'styles';

import { ReleaseDatesList } from '../../../features/release-dates-list';

interface ReleaseDatedProps {
  release: Release;
}

export function ReleaseDates({ release }: ReleaseDatedProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { refresh } = useContext(ReleasesDatesContext);

  useEffect(() => {
    refresh(release.id).finally(() => setLoading(false));
  }, [refresh, release.id]);

  const navigation = useNavigation();

  const { user } = useAuth();

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator color={colors.gray[700]} />
      </Section>
    );
  }

  return (
    <Section
      flex
      style={{ alignItems: Platform.OS === 'android' ? 'center' : 'stretch' }}
    >
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
    </Section>
  );
}
