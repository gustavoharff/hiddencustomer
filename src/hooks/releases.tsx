import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';

import { api, getRealm } from 'services';

import { Release } from 'types';

import { useAuth } from 'hooks';

type CreateReleaseData = {
  name: string;
  customer_id: string;
};

type UpdateReleaseData = {
  release_id: string;
  name: string;
  paid: boolean;
  customer_id: string;
};
type UpdateReleaseAnnotationsData = {
  release_id: string;
  annotations: string;
};

type ReleasesContextData = {
  releases: Release[];
  loadApiReleases: () => Promise<void>;
  loadLocalReleases: () => Promise<void>;
  createRelease: (data: CreateReleaseData) => Promise<void>;
  updateRelease: (data: UpdateReleaseData) => Promise<void>;
  deleteRelease: (releaseId: string) => Promise<void>;
  updateReleaseAnnotations: (
    data: UpdateReleaseAnnotationsData,
  ) => Promise<void>;
};

type ReleasesProviderProps = {
  children: ReactNode;
};

const ReleasesContext = createContext<ReleasesContextData>(
  {} as ReleasesContextData,
);

export function ReleasesProvider({ children }: ReleasesProviderProps) {
  const [releases, setReleases] = useState<Release[]>([]);

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

  const loadLocalReleases = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Release>('Release').sorted('name', true);

    const formattedReleases = data.map(release => ({
      id: release.id,
      name: release.name,
      customer_id: release.customer_id,
      company_id: release.company_id,
      paid: release.paid,
      annotations: release.annotations,
      created_at: release.created_at,
      updated_at: release.updated_at,
    }));

    setReleases(formattedReleases);
  }, [setReleases]);

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

  const updateRelease = useCallback(
    async ({ release_id, name, paid, customer_id }: UpdateReleaseData) => {
      try {
        const response = await api.put(`/release/${release_id}`, {
          name,
          customer_id,
          paid,
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

  const updateReleaseAnnotations = useCallback(
    async ({ release_id, annotations }: UpdateReleaseAnnotationsData) => {
      try {
        const response = await api.put(`/release/${release_id}`, {
          annotations,
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
    await api.delete(`/releases/${releaseId}`);
    setReleases(state => state.filter(release => release.id !== releaseId));

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Release', releaseId));
    });
  }, []);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        loadApiReleases,
        loadLocalReleases,
        createRelease,
        updateRelease,
        deleteRelease,
        updateReleaseAnnotations,
      }}
    >
      {children}
    </ReleasesContext.Provider>
  );
}

export function useReleases(): ReleasesContextData {
  const context = useContext(ReleasesContext);

  if (!context) {
    throw new Error('useReleases must be used within an ReleasesProvider');
  }

  return context;
}
