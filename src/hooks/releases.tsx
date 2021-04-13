import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';

import { api, getRealm } from 'services';

import { Release, ReleaseDate, ReleaseGroup } from 'types';

import { useAuth } from 'hooks';

interface CreateReleaseData {
  name: string;
  customer_id: string;
}

interface CreateReleaseGroupData {
  name: string;
  type: string;
  release_id: string;
}

interface CreateReleaseDateData {
  date: Date;
  release_id: string;
}

interface UpdateReleaseData {
  release_id: string;
  name?: string;
  paid?: boolean;
  customer_id?: string;
  annotations?: string;
}

interface ReleasesContextData {
  releases: Release[];
  releasesGroups: ReleaseGroup[];
  releasesDates: ReleaseDate[];
  loadApiReleases: () => Promise<void>;
  loadApiReleasesGroups: () => Promise<void>;
  loadApiReleasesDates: () => Promise<void>;
  loadLocalReleases: () => Promise<void>;
  loadLocalReleasesGroups: () => Promise<void>;
  loadLocalReleasesDates: () => Promise<void>;
  createRelease: (data: CreateReleaseData) => Promise<void>;
  createReleaseGroup: (data: CreateReleaseGroupData) => Promise<void>;
  createReleaseDate: (data: CreateReleaseDateData) => Promise<void>;
  updateRelease: (data: UpdateReleaseData) => Promise<void>;
  deleteRelease: (releaseId: string) => Promise<void>;
  deleteReleaseGroup: (groupId: string) => Promise<void>;
  deleteReleaseDate: (dateId: string) => Promise<void>;
}

interface ReleasesProviderProps {
  children: ReactNode;
}

const ReleasesContext = createContext<ReleasesContextData>(
  {} as ReleasesContextData,
);

export function ReleasesProvider({
  children,
}: ReleasesProviderProps): JSX.Element {
  const [releases, setReleases] = useState<Release[]>([]);
  const [releasesGroups, setReleasesGroups] = useState<ReleaseGroup[]>([]);

  const [releasesDates, setReleasesDates] = useState<ReleaseDate[]>([]);

  const { signOut } = useAuth();

  const loadApiReleases = useCallback(async () => {
    try {
      const response = await api.get('/releases');
      setReleases(response.data);

      const realm = await getRealm();

      realm.write(() => {
        const data = realm.objects('Release');
        realm.delete(data);

        response.data.map((release: Release) =>
          realm.create('Release', release),
        );
      });
    } catch (err) {
      if (err.response.status === 440) {
        Alert.alert('Sessão expirada', 'Realize o login novamente!');
        signOut();
      }
    }
  }, [setReleases, signOut]);

  const loadApiReleasesGroups = useCallback(async () => {
    try {
      const response = await api.get('/releases/groups');

      setReleasesGroups(response.data);

      const realm = await getRealm();

      realm.write(() => {
        const data = realm.objects('ReleaseGroup');
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
  }, [signOut]);

  const loadApiReleasesDates = useCallback(async () => {
    try {
      const response = await api.get('/release/dates/company');

      setReleasesDates(response.data);

      const realm = await getRealm();

      realm.write(() => {
        const data = realm.objects('ReleaseDate');
        realm.delete(data);

        response.data.map((releaseDate: ReleaseDate) =>
          realm.create('ReleaseDate', releaseDate),
        );
      });
    } catch (err) {
      if (err.response.status === 440) {
        Alert.alert('Sessão expirada', 'Realize o login novamente!');
        signOut();
      }
    }
  }, [signOut]);

  const loadLocalReleases = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Release>('Release').sorted('name', true);

    const formatedReleases = data.map(release => ({
      id: release.id,
      name: release.name,
      customer_id: release.customer_id,
      company_id: release.company_id,
      paid: release.paid,
      annotations: release.annotations,
      created_at: release.created_at,
      updated_at: release.updated_at,
    })) as Release[];

    setReleases(formatedReleases);
  }, [setReleases]);

  const loadLocalReleasesGroups = useCallback(async () => {
    const realm = await getRealm();

    const data = realm
      .objects<ReleaseGroup>('ReleaseGroup')
      .sorted('name', true);

    const formatedReleasesGroups = data.map(releaseGroup => ({
      id: releaseGroup.id,
      name: releaseGroup.name,
      type: releaseGroup.type,
      release_id: releaseGroup.release_id,
      company_id: releaseGroup.company_id,
      created_at: releaseGroup.created_at,
      updated_at: releaseGroup.updated_at,
    })) as ReleaseGroup[];

    setReleasesGroups(formatedReleasesGroups);
  }, []);

  const loadLocalReleasesDates = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<ReleaseDate>('ReleaseDate').sorted('date', true);

    const formatedReleasesDates = data.map(releaseDate => ({
      id: releaseDate.id,
      date: releaseDate.date,
      release_id: releaseDate.release_id,
      company_id: releaseDate.company_id,
      created_at: releaseDate.created_at,
      updated_at: releaseDate.updated_at,
    })) as ReleaseDate[];

    setReleasesDates(formatedReleasesDates);
  }, []);

  const createRelease = useCallback(
    async ({ name, customer_id }: CreateReleaseData) => {
      try {
        const response = await api.post<Release>('/releases', {
          name,
          customer_id,
        });

        setReleases(state => [response.data, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('Release', response.data);
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

  const createReleaseGroup = useCallback(
    async ({ name, type, release_id }: CreateReleaseGroupData) => {
      try {
        const response = await api.post('/release/groups', {
          name,
          type,
          release_id,
        });

        setReleasesGroups(state => [response.data, ...state]);

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

  const createReleaseDate = useCallback(
    async ({ date, release_id }: CreateReleaseDateData) => {
      const response = await api.post('/release/dates', {
        release_id,
        date: date.toISOString(),
      });

      setReleasesDates(state => [...state, response.data]);

      const realm = await getRealm();

      realm.write(() => {
        realm.create('ReleaseDate', response.data);
      });
    },
    [],
  );

  const updateRelease = useCallback(
    async ({
      release_id,
      name,
      paid,
      annotations,
      customer_id,
    }: UpdateReleaseData) => {
      try {
        const response = await api.put(`/release/${release_id}`, {
          name,
          paid,
          annotations,
          customer_id,
        });

        setReleases(state =>
          state.map(release =>
            release.id === release_id ? response.data : release,
          ),
        );
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

  const deleteRelease = useCallback(async (releaseId: string) => {
    await api.delete(`/release/${releaseId}`);
    setReleases(state => state.filter(release => release.id !== releaseId));

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Release', releaseId));
    });
  }, []);

  const deleteReleaseGroup = useCallback(async (groupId: string) => {
    await api.delete(`/release/groups/${groupId}`);
    setReleasesGroups(state => state.filter(group => group.id !== groupId));

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('ReleaseGroup', groupId));
    });
  }, []);

  const deleteReleaseDate = useCallback(async (dateId: string) => {
    try {
      await api.delete(`/release/dates/${dateId}`);

      setReleasesDates(state =>
        state.filter(releaseDate => releaseDate.id !== dateId),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('ReleaseDate', dateId));
      });
    } catch (err) {
      Alert.alert('Erro!', 'Ocorreu um erro, reporte aos desenvolvedores!');
    }
  }, []);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        releasesGroups,
        releasesDates,
        loadApiReleases,
        loadApiReleasesGroups,
        loadApiReleasesDates,
        loadLocalReleases,
        loadLocalReleasesGroups,
        loadLocalReleasesDates,
        createRelease,
        createReleaseGroup,
        createReleaseDate,
        updateRelease,
        deleteRelease,
        deleteReleaseGroup,
        deleteReleaseDate,
      }}
    >
      {children}
    </ReleasesContext.Provider>
  );
}

export function useReleases(): ReleasesContextData {
  const context = useContext(ReleasesContext);

  return context;
}
