import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import produce from 'immer';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { api, getRealm } from 'services';

import { Release, ReleaseDate, ReleaseGroup } from 'types';

import { useAuth } from 'hooks';

interface CreateReleaseData {
  name: string;
  customer_id: string;
}

interface UpdateReleaseData {
  release_id: string;
  name?: string;
  paid?: boolean;
  customer_id?: string;
  annotations?: string;
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

interface CreateReleaseDateData {
  date: Date;
  release_id: string;
}

interface ReleasesContextData {
  releases: Release[];
  isLoading: boolean;
  isFetching: boolean;
  activeReleasesFilter: boolean;
  setActiveReleasesFilter: React.Dispatch<React.SetStateAction<boolean>>;
  customerReleasesFilter: string;
  setCustomerReleasesFilter: React.Dispatch<React.SetStateAction<string>>;
  releasesDates: ReleaseDate[];
  loadReleases: () => Promise<Release[]>;
  loadReleaseDates: (releaseId: string) => Promise<void>;
  loadReleaseGroups: (releaseId: string) => Promise<void>;
  loadReleasesDates: () => Promise<void>;
  createRelease: (data: CreateReleaseData) => Promise<void>;
  createReleaseGroup: (data: CreateReleaseGroupData) => Promise<void>;
  createReleaseDate: (data: CreateReleaseDateData) => Promise<void>;
  updateRelease: (data: UpdateReleaseData) => Promise<void>;
  updateReleaseGroup: (data: UpdateReleaseGroupData) => Promise<void>;
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
  const [activeReleasesFilter, setActiveReleasesFilter] = useState(false);
  const [customerReleasesFilter, setCustomerReleasesFilter] = useState('all');

  const [releasesDates, setReleasesDates] = useState<ReleaseDate[]>([]);

  const { signOut } = useAuth();

  useEffect(() => {
    async function loadLocalFilters() {
      const localActiveReleasesFilter = await AsyncStorage.getItem(
        'ReleaseActiveFilter',
      );

      const localCustomerReleasesFilter = await AsyncStorage.getItem(
        'CustomerReleasesFilter',
      );

      if (localActiveReleasesFilter) {
        setActiveReleasesFilter(localActiveReleasesFilter === '1');
      }

      if (localCustomerReleasesFilter) {
        setCustomerReleasesFilter(localCustomerReleasesFilter);
      }
    }

    loadLocalFilters();
  }, []);

  const loadReleases = useCallback(async () => {
    let data = [] as Release[];

    const realm = await getRealm();
    try {
      const response = await api.get('/releases');
      data = response.data;

      realm.write(() => {
        response.data.forEach((release: Release) => {
          /* @ts-ignore */
          realm.create('Release', release, 'modified');
        });
      });
    } catch (err) {
      if (err.response?.status === 440) {
        Alert.alert('Sessão expirada', 'Realize o login novamente!');
        signOut();
        throw new Error('Session timeout!');
      }
      const localReleases = realm
        .objects<Release>('Release')
        .sorted('name', true);

      data = localReleases.map(release => ({
        id: release.id,
        name: release.name,
        customer_id: release.customer_id,
        company_id: release.company_id,
        paid: release.paid,
        groups: release.groups,
        dates: release.dates,
        customer: release.customer,
        annotations: release.annotations,
        created_at: release.created_at,
        updated_at: release.updated_at,
      })) as Release[];
    }

    if (activeReleasesFilter) {
      data = data.filter(release => {
        if (release.dates.length >= 1) {
          if (moment(release.dates[0].date).isBefore(new Date())) {
            return false;
          }
        }

        return true;
      });
    }

    if (customerReleasesFilter !== '' && customerReleasesFilter !== 'all') {
      data = data.filter(
        release => release.customer_id === customerReleasesFilter,
      );
    }

    setReleases(data);

    return data;
  }, [activeReleasesFilter, customerReleasesFilter, signOut]);

  const { isLoading, isFetching } = useQuery('releases', loadReleases, {
    refetchInterval: 1800 * 15,
    refetchOnWindowFocus: true,
  });

  const loadReleaseDates = useCallback(
    async releaseId => {
      const realm = await getRealm();
      try {
        const response = await api.get(`release/dates/${releaseId}`);

        setReleases(
          releases.map(release => {
            if (release.id === releaseId) {
              release.dates = response.data; // eslint-disable-line
            }

            return release;
          }),
        );

        realm.write(() => {
          response.data.forEach((date: ReleaseDate) => {
            /* @ts-ignore */
            realm.create('ReleaseDate', date, 'modified');
          });
        });
      } catch (err) {
        if (err.response?.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
          return;
        }

        const data = realm
          .objects<ReleaseDate>('ReleaseDate')
          .sorted('date', true)
          .filtered(`release_id == ${releaseId}`);

        setReleases(
          releases.map(release => {
            if (release.id === releaseId) {
              release.dates = [ // eslint-disable-line
                ...data.map(releaseDate => ({
                  id: releaseDate.id,
                  date: releaseDate.date,
                  release_id: releaseDate.release_id,
                  company_id: releaseDate.company_id,
                  created_at: releaseDate.created_at,
                  updated_at: releaseDate.updated_at,
                })),
              ];
            }
            return release;
          }),
        );
      }
    },
    [releases, signOut],
  );

  const loadReleaseGroups = useCallback(
    async releaseId => {
      const realm = await getRealm();
      try {
        const response = await api.get<ReleaseGroup[]>(
          `release/groups/${releaseId}`,
        );

        setReleases(
          releases.map(release => {
            if (release.id === releaseId) {
              release.groups = response.data; // eslint-disable-line
            }

            return release;
          }),
        );

        realm.write(() => {
          response.data.forEach(group => {
            /* @ts-ignore */
            realm.create('ReleaseGroup', group, 'modified');
          });
        });
      } catch (err) {
        if (err.response?.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
          return;
        }

        const data = realm
          .objects<ReleaseGroup>('ReleaseGroup')
          .sorted('name', true)
          .filtered(`release_id == ${releaseId}`);

        setReleases(
          releases.map(release => {
            if (release.id === releaseId) {
                release.groups = [ // eslint-disable-line
                ...data.map(releaseGroup => ({
                  id: releaseGroup.id,
                  name: releaseGroup.name,
                  type: releaseGroup.type,
                  release_id: releaseGroup.release_id,
                  company_id: releaseGroup.company_id,
                  created_at: releaseGroup.created_at,
                  updated_at: releaseGroup.updated_at,
                })),
              ];
            }
            return release;
          }),
        );
      }
    },
    [releases, signOut],
  );

  const loadReleasesDates = useCallback(async () => {
    const realm = await getRealm();
    try {
      const response = await api.get('/release/dates/company');

      setReleasesDates(response.data);

      realm.write(() => {
        const localReleasesDates = realm.objects('ReleaseDate');
        realm.delete(localReleasesDates);

        response.data.map((releaseDate: ReleaseDate) =>
          realm.create('ReleaseDate', releaseDate),
        );
      });
    } catch (err) {
      if (err.response?.status === 440) {
        Alert.alert('Sessão expirada', 'Realize o login novamente!');
        signOut();
        return;
      }

      const data = realm
        .objects<ReleaseDate>('ReleaseDate')
        .sorted('date', true);

      setReleasesDates(
        data.map(date => ({
          id: date.id,
          date: date.date,
          release_id: date.release_id,
          company_id: date.company_id,
          created_at: date.created_at,
          updated_at: date.updated_at,
        })),
      );
    }
  }, [signOut]);

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
          try {
            realm.create('Release', response.data);
          } catch {
            /* @ts-ignore */
            realm.create('Release', response.data, 'modified');
          }
        });
      } catch (err) {
        if (err.response?.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
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

        const realm = await getRealm();

        realm.write(() => {
          /* @ts-ignore */
          realm.create('Release', response.data, 'modified');
        });
      } catch (err) {
        if (err.response?.status === 440) {
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

  const createReleaseGroup = useCallback(
    async ({
      name,
      type,
      release_id,
      release_date_id,
    }: CreateReleaseGroupData) => {
      try {
        const response = await api.post('/release/groups', {
          name,
          type,
          release_id,
          release_date_id,
        });

        setReleases(
          produce(releases, drafts => {
            drafts.forEach(release => {
              if (release.id === release_id) {
                release.groups.push(response.data);
              }
            });
          }),
        );

        const realm = await getRealm();

        realm.write(() => {
          realm.create('ReleaseGroup', response.data);
        });
      } catch (err) {
        if (err.response?.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut, releases],
  );

  const updateReleaseGroup = useCallback(
    async ({
      groupId,
      name,
      type,
      release_date_id,
    }: UpdateReleaseGroupData) => {
      const response = await api.put(`/release/groups/${groupId}`, {
        name,
        type,
        release_date_id,
      });

      setReleases(
        releases.map(rls => ({
          ...rls,
          groups: rls.groups.map(group =>
            group.id === groupId ? response.data : group,
          ),
        })),
      );
    },
    [releases],
  );

  const deleteReleaseGroup = useCallback(
    async (groupId: string) => {
      await api.delete(`/release/groups/${groupId}`);

      setReleases(
        releases.map(rls => ({
          ...rls,
          groups: rls.groups.filter(group => group.id !== groupId),
        })),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('ReleaseGroup', groupId));
      });
    },
    [releases],
  );

  const createReleaseDate = useCallback(
    async ({ date, release_id }: CreateReleaseDateData) => {
      const response = await api.post('/release/dates', {
        release_id,
        date: date.toISOString(),
      });

      setReleases(rls =>
        rls.map(release => {
          if (release.id === release_id) {
            return {
              ...release,
              dates: [...release.dates, response.data],
            };
          }
          return release;
        }),
      );

      const realm = await getRealm();

      realm.write(() => {
        realm.create('ReleaseDate', response.data);
      });
    },
    [],
  );

  const deleteReleaseDate = useCallback(
    async (dateId: string) => {
      try {
        await api.delete(`/release/dates/${dateId}`);

        setReleases(
          releases.map(rls => ({
            ...rls,
            dates: rls.dates.filter(date => date.id !== dateId),
          })),
        );

        const realm = await getRealm();

        realm.write(() => {
          realm.delete(realm.objectForPrimaryKey('ReleaseDate', dateId));
        });
      } catch (err) {
        Alert.alert('Erro!', 'Ocorreu um erro, reporte aos desenvolvedores!');
      }
    },
    [releases],
  );

  useEffect(() => {
    loadReleases();
  }, [
    activeReleasesFilter,
    customerReleasesFilter,
    api.defaults.headers.authorization,
  ]);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        isLoading,
        isFetching,
        activeReleasesFilter,
        setActiveReleasesFilter,
        customerReleasesFilter,
        setCustomerReleasesFilter,
        releasesDates,
        loadReleases,
        loadReleaseDates,
        loadReleasesDates,
        loadReleaseGroups,
        createRelease,
        createReleaseGroup,
        createReleaseDate,
        updateRelease,
        updateReleaseGroup,
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
