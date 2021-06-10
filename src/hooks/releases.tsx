import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

import { UpdateMode } from 'realm';

import { api, getRealm } from 'services';

import { Release } from 'types';

interface CreateReleaseData {
  name: string;
  paid: boolean;
  customer_id: string;
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
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
  refresh: () => Promise<void>;
  createRelease: (data: CreateReleaseData) => Promise<void>;
  updateRelease: (data: UpdateReleaseData) => Promise<void>;
  deleteRelease: (release_id: string) => Promise<void>;
  activeFilter: boolean;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  customerFilter: string;
  setCustomerFilter: React.Dispatch<React.SetStateAction<string>>;
}

interface ReleasesProviderProps {
  children: ReactNode;
}

export const ReleasesContext = createContext<ReleasesContextData>(
  {} as ReleasesContextData,
);

export function ReleasesProvider({
  children,
}: ReleasesProviderProps): JSX.Element {
  const [releases, setReleases] = useState<Release[]>([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [customerFilter, setCustomerFilter] = useState('');

  useEffect(() => {
    async function loadStorageFilters() {
      const active = await AsyncStorage.getItem('activeFilter');
      setActiveFilter(active === 'true');
      const customer = await AsyncStorage.getItem('customerFilter');
      setCustomerFilter(customer !== '' && customer !== null ? customer : '');
    }

    loadStorageFilters();
  }, []);

  const applyFilters = useCallback(
    (state: Release[]): Release[] => {
      let filtered = state;

      if (activeFilter) {
        filtered = filtered.filter(
          release =>
            release.dates.length === 0 ||
            !moment(release?.dates[0].date).isBefore(new Date()),
        );
      }

      if (customerFilter !== '') {
        filtered = filtered.filter(
          release => release.customer_id === customerFilter,
        );
      }

      return filtered;
    },
    [activeFilter, customerFilter],
  );

  const refresh = useCallback(async () => {
    const realm = await getRealm();

    try {
      const response = await api.get<Release[]>('/releases');
      setReleases(applyFilters(response.data));

      realm.write(() => {
        const data = realm.objects('Release');
        realm.delete(data);

        response.data.forEach(release => {
          realm.create('Release', release, UpdateMode.Modified);
        });
      });
    } catch {
      realm.write(() => {
        const data = realm.objects<Release>('Release');
        setReleases(
          applyFilters(
            data.map(release => ({
              id: release.id,
              name: release.name,
              annotations: release.annotations,
              paid: release.paid,
              company_id: release.company_id,
              customer_id: release.customer_id,
              dates: release.dates,
              groups: release.groups,
              customer: release.customer,
              created_at: release.created_at,
              updated_at: release.updated_at,
            })),
          ),
        );
      });
    }
  }, [applyFilters]);

  const createRelease = useCallback(
    async ({ name, paid, customer_id }: CreateReleaseData) => {
      const response = await api.post<Release>('/releases', {
        name,
        paid,
        customer_id,
      });

      setReleases(state => [response.data, ...state]);

      const realm = await getRealm();

      realm.write(() => {
        realm.create('Release', response.data, UpdateMode.All);
      });
    },
    [],
  );

  const updateRelease = useCallback(
    async ({
      release_id,
      name,
      paid,
      customer_id,
      annotations,
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

      const realm = await getRealm();

      realm.write(() => {
        realm.create('Release', response.data, UpdateMode.Modified);
      });
    },
    [],
  );

  const deleteRelease = useCallback(async (release_id: string) => {
    await api.delete(`/release/${release_id}`);

    setReleases(state => state.filter(release => release.id !== release_id));
  }, []);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        setReleases,
        refresh,
        createRelease,
        updateRelease,
        deleteRelease,
        activeFilter,
        setActiveFilter,
        customerFilter,
        setCustomerFilter,
      }}
    >
      {children}
    </ReleasesContext.Provider>
  );
}
