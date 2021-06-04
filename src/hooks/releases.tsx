import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import produce from 'immer';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { api } from 'services';

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
  activeReleasesFilter: boolean;
  setActiveReleasesFilter: React.Dispatch<React.SetStateAction<boolean>>;
  customerReleasesFilter: string;
  setCustomerReleasesFilter: React.Dispatch<React.SetStateAction<string>>;
  releasesDates: ReleaseDate[];
  loadReleases: () => Promise<void>;
  loadReleaseDates: (releaseId: string) => Promise<void>;
  loadReleaseGroups: (releaseId: string) => Promise<void>;
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

  const { user } = useAuth();

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
    if (!user?.id) {
      return;
    }

    const response = await api.get<Release[]>('/releases');
    let { data } = response;

    if (customerReleasesFilter !== '' && customerReleasesFilter !== 'all') {
      data = data.filter(
        release => release.customer_id === customerReleasesFilter,
      );
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

    setReleases(data);
  }, [activeReleasesFilter, customerReleasesFilter, user]);

  const loadReleaseDates = useCallback(async releaseId => {
    const response = await api.get(`release/dates/${releaseId}`);

    setReleases(state =>
      state.map(release => {
        if (release.id === releaseId) {
          release.dates = response.data; // eslint-disable-line
        }

        return release;
      }),
    );
  }, []);

  const loadReleaseGroups = useCallback(async releaseId => {
    const response = await api.get<ReleaseGroup[]>(
      `release/groups/${releaseId}`,
    );

    setReleases(state =>
      state.map(release => {
        if (release.id === releaseId) {
          release.groups = response.data; // eslint-disable-line
        }

        return release;
      }),
    );
  }, []);

  const createRelease = useCallback(
    async ({ name, customer_id }: CreateReleaseData) => {
      const response = await api.post<Release>('/releases', {
        name,
        customer_id,
      });

      setReleases(state => [response.data, ...state]);
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
    },
    [],
  );

  const deleteRelease = useCallback(async (releaseId: string) => {
    await api.delete(`/release/${releaseId}`);

    setReleases(state => state.filter(release => release.id !== releaseId));
  }, []);

  const createReleaseGroup = useCallback(
    async ({
      name,
      type,
      release_id,
      release_date_id,
    }: CreateReleaseGroupData) => {
      const response = await api.post('/release/groups', {
        name,
        type,
        release_id,
        release_date_id,
      });

      setReleases(state =>
        produce(state, drafts => {
          drafts.forEach(release => {
            if (release.id === release_id) {
              release.groups.push(response.data);
            }
          });
        }),
      );
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
      const response = await api.put(`/release/groups/${groupId}`, {
        name,
        type,
        release_date_id,
      });

      setReleases(state =>
        state.map(rls => ({
          ...rls,
          groups: rls.groups.map(group =>
            group.id === groupId ? response.data : group,
          ),
        })),
      );
    },
    [],
  );

  const deleteReleaseGroup = useCallback(async (groupId: string) => {
    await api.delete(`/release/groups/${groupId}`);

    setReleases(state =>
      state.map(rls => ({
        ...rls,
        groups: rls.groups.filter(group => group.id !== groupId),
      })),
    );
  }, []);

  const createReleaseDate = useCallback(
    async ({ date, release_id }: CreateReleaseDateData) => {
      const response = await api.post('/release/dates', {
        release_id,
        date: date.toISOString(),
      });

      setReleases(state =>
        state.map(release => {
          if (release.id === release_id) {
            return {
              ...release,
              dates: [...release.dates, response.data],
            };
          }
          return release;
        }),
      );
    },
    [],
  );

  const deleteReleaseDate = useCallback(async (dateId: string) => {
    await api.delete(`/release/dates/${dateId}`);

    setReleases(state =>
      state.map(rls => ({
        ...rls,
        dates: rls.dates.filter(date => date.id !== dateId),
      })),
    );
  }, []);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        activeReleasesFilter,
        setActiveReleasesFilter,
        customerReleasesFilter,
        setCustomerReleasesFilter,
        releasesDates,
        loadReleases,
        loadReleaseDates,
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
