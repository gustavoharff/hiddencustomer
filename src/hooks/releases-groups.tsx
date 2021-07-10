import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { UpdateMode } from 'realm';
import { api, getRealm } from 'services';

import { ReleaseGroup } from 'types';

interface ReleasesGroupsContextData {
  groups: ReleaseGroup[];
  refresh: (release_id: string) => Promise<void>;
  refreshing: boolean;
  createReleaseGroup: (data: CreateReleaseGroupData) => Promise<void>;
  updateReleaseGroup: (data: UpdateReleaseGroupData) => Promise<void>;
  deleteReleseGroup: (group_id: string) => Promise<void>;
}

interface CreateReleaseGroupData {
  name: string;
  type: string;
  release_id: string;
  release_date_id?: string;
}

interface UpdateReleaseGroupData {
  groupId: string;
  name: string;
  type: string;
  release_date_id?: string;
}

interface ReleasesGroupsProviderProps {
  children: ReactNode;
}

export const ReleasesGroupsContext = createContext<ReleasesGroupsContextData>(
  {} as ReleasesGroupsContextData,
);

export function ReleaseGroupsProvider({
  children,
}: ReleasesGroupsProviderProps): JSX.Element {
  const [groups, setGroups] = useState<ReleaseGroup[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async (release_id: string) => {
    const realm = await getRealm();
    setRefreshing(true);
    try {
      const response = await api.get<ReleaseGroup[]>(
        `/release/groups/${release_id}`,
      );

      realm.write(() => {
        const data = realm
          .objects('ReleaseGroup')
          .filtered(`release_id = '${release_id}'`);
        realm.delete(data);

        response.data.forEach(group => {
          realm.create('ReleaseGroup', group, UpdateMode.All);
        });
      });

      setGroups(response.data);
    } catch {
      realm.write(() => {
        const data = realm
          .objects<ReleaseGroup>('ReleaseGroup')
          .filtered(`release_id = '${release_id}'`);

        setGroups(
          data.map(group => ({
            id: group.id,
            name: group.name,
            type: group.type,
            release_date_id: group.release_date_id,
            release_date: group.release_date,
            company_id: group.company_id,
            release_id: group.release_id,
            created_at: group.created_at,
            updated_at: group.updated_at,
          })),
        );
      });
    } finally {
      realm.close();
    }
    setRefreshing(false);
  }, []);

  const createReleaseGroup = useCallback(
    async ({
      name,
      type,
      release_id,
      release_date_id,
    }: CreateReleaseGroupData) => {
      const realm = await getRealm();
      const response = await api.post<ReleaseGroup>('/release/groups', {
        name,
        type,
        release_id,
        release_date_id,
      });

      setGroups(state => [...state, response.data]);

      realm.write(() => {
        realm.create('ReleaseGroup', response.data, UpdateMode.All);
      });

      realm.close();
    },
    [],
  );

  const updateReleaseGroup = useCallback(
    async ({
      groupId,
      name,
      type,
      release_date_id,
    }: UpdateReleaseGroupData) => {
      const realm = await getRealm();
      const response = await api.put(`/release/groups/${groupId}`, {
        name,
        type,
        release_date_id,
      });

      setGroups(state =>
        state.map(group =>
          group.id === response.data.id ? response.data : group,
        ),
      );

      realm.write(() => {
        realm.create('ReleaseGroup', response.data, UpdateMode.Modified);
      });

      realm.close();
    },
    [],
  );

  const deleteReleseGroup = useCallback(async (group_id: string) => {
    await api.delete(`/release/groups/${group_id}`);
    setGroups(state => state.filter(group => group.id !== group_id));

    const realm = await getRealm();

    realm.write(() => {
      const data = realm.objectForPrimaryKey('ReleaseGroup', group_id);
      realm.delete(data);
    });

    realm.close();
  }, []);

  return (
    <ReleasesGroupsContext.Provider
      value={{
        groups,
        refresh,
        refreshing,
        createReleaseGroup,
        updateReleaseGroup,
        deleteReleseGroup,
      }}
    >
      {children}
    </ReleasesGroupsContext.Provider>
  );
}
