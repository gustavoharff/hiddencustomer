import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';

import { ReleaseGroup } from 'types';

import { api } from 'services';

import { Screen, Section } from 'components';

import { ReleaseDateGroupsList } from './ReleaseDateGroupsList';

type Params = {
  ReleaseDateGroups: {
    date_id: string;
  };
};

type ReleaseDateGroupsProps = StackScreenProps<Params, 'ReleaseDateGroups'>;

export function ReleaseDateGroups({
  route,
}: ReleaseDateGroupsProps): JSX.Element {
  const [groups, setGroups] = useState<ReleaseGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/release/date/groups/${route.params.date_id}`)
      .then(response => {
        setGroups(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route.params.date_id]);

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator />
      </Section>
    );
  }

  return (
    <Screen>
      <ReleaseDateGroupsList groups={groups} />
    </Screen>
  );
}
