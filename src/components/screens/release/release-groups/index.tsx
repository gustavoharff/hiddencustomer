import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { Release } from 'types';

import { ReleasesGroupsContext, useAuth } from 'hooks';

import { Section } from 'components/ui';

import { colors } from 'styles';

import { Container } from './styles';

import { ReleaseGroupsList } from '../../../features/release-groups-list';

interface ReleaseGroupsProps {
  release: Release;
}

export function ReleaseGroups({ release }: ReleaseGroupsProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { refresh } = useContext(ReleasesGroupsContext);

  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    refresh(release.id).finally(() => setLoading(false));
  }, [refresh, release.id]);

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator color={colors.gray[700]} />
      </Section>
    );
  }

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
