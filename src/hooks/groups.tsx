import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { Alert } from 'react-native';

import { api, getRealm } from 'services';

import { ReleaseGroup } from 'types';

import { useAuth } from './auth';

interface CreateGroupProps {
  name: string;
  type: string;
  release_id: string;
}

interface GroupsContextData {
  groups: ReleaseGroup[];
  loadApiGroups: (releaseId: string) => Promise<void>;
  loadLocalGroups: (releaseId: string) => Promise<void>;
  createGroup: (data: CreateGroupProps) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
}

interface GroupProviderProps {
  children: ReactNode;
}

const GroupsContext = createContext<GroupsContextData>({} as GroupsContextData);

export function GroupProvider({ children }: GroupProviderProps): JSX.Element {
  const [groups, setGroups] = useState<ReleaseGroup[]>([]);

  const { signOut } = useAuth();

  const loadApiGroups = useCallback(
    async (releaseId: string) => {
      if (!releaseId) {
        return;
      }

      try {
        const response = await api.get(`/release/groups/${releaseId}`);

        setGroups(response.data);

        const realm = await getRealm();

        realm.write(() => {
          const data = realm
            .objects('ReleaseGroup')
            .filtered(`release_id == '${releaseId}'`);

          realm.delete(data);
          response.data.map((releaseGroup: ReleaseGroup) =>
            realm.create('ReleaseGroup', releaseGroup),
          );
        });
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

  const loadLocalGroups = useCallback(async (releaseId: string) => {
    if (!releaseId) {
      return;
    }

    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects<ReleaseGroup>('ReleaseGroup')
        .filtered(`release_id == '${releaseId}'`);

      const formattedGroups = data.map(group => ({
        id: group.id,
        name: group.name,
        type: group.type,
        release_id: group.release_id,
        created_at: group.created_at,
        updated_at: group.updated_at,
      }));

      setGroups(formattedGroups);
    });
  }, []);

  const createGroup = useCallback(
    async ({ name, type, release_id }: CreateGroupProps) => {
      try {
        const response = await api.post('/release/groups', {
          name,
          type,
          release_id,
        });

        setGroups(state => [response.data, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('ReleaseGroup', response.data);
        });
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

  const deleteGroup = useCallback(
    async (groupId: string) => {
      await api.delete(`/release/groups/${groupId}`);
      setGroups(groups.filter(group => group.id !== groupId));

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('ReleaseGroup', groupId));
      });
    },
    [groups],
  );

  return (
    <GroupsContext.Provider
      value={{
        groups,
        loadApiGroups,
        loadLocalGroups,
        createGroup,
        deleteGroup,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

export function useGroups(): GroupsContextData {
  const context = useContext(GroupsContext);

  return context;
}
