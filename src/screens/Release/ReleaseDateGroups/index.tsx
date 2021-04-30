import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ReleaseGroup } from 'types';

import { api } from 'services';

import { Screen } from 'components';

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

  useEffect(() => {
    api.get(`/release/date/groups/${route.params.date_id}`).then(response => {
      setGroups(response.data);
    });
  }, [route.params.date_id]);

  return (
    <Screen>
      <ReleaseDateGroupsList groups={groups} />
    </Screen>
  );
}
