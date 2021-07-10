import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { UpdateMode } from 'realm';
import { api } from 'services';

import { ReleaseDate } from 'types';
import { useRealm } from './realm';

interface ReleasesDatesContextData {
  dates: ReleaseDate[];
  refresh: (release_id: string) => Promise<void>;
  createReleaseDate: (data: CreateReleaseDateData) => Promise<void>;
  deleteReleseDate: (date_id: string) => Promise<void>;
}

interface CreateReleaseDateData {
  date: Date;
  release_id: string;
}

interface ReleasesDatesProviderProps {
  children: ReactNode;
}

export const ReleasesDatesContext = createContext<ReleasesDatesContextData>(
  {} as ReleasesDatesContextData,
);

export function ReleaseDatesProvider({
  children,
}: ReleasesDatesProviderProps): JSX.Element {
  const { realm } = useRealm();

  const [dates, setDates] = useState<ReleaseDate[]>([]);

  function sortDates(state: ReleaseDate[]) {
    return state.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }

      if (a.date > b.date) {
        return -1;
      }

      return 0;
    });
  }

  const refresh = useCallback(
    async (release_id: string) => {
      try {
        const response = await api.get<ReleaseDate[]>(
          `/release/dates/${release_id}`,
        );

        realm.write(() => {
          const data = realm
            .objects('ReleaseDate')
            .filtered(`release_id = '${release_id}'`);
          realm.delete(data);

          response.data.forEach(date => {
            realm.create('ReleaseDate', date, UpdateMode.All);
          });
        });

        setDates(response.data);
      } catch {
        realm.write(() => {
          const data = realm
            .objects<ReleaseDate>('ReleaseDate')
            .filtered(`release_id = '${release_id}'`);

          setDates(
            sortDates(
              data.map(date => ({
                id: date.id,
                date: date.date,
                company_id: date.company_id,
                release_id: date.release_id,
                created_at: date.created_at,
                updated_at: date.updated_at,
              })),
            ),
          );
        });
      }
    },
    [realm],
  );

  const createReleaseDate = useCallback(
    async ({ date, release_id }: CreateReleaseDateData) => {
      const response = await api.post<ReleaseDate>('/release/dates', {
        date: date.toISOString(),
        release_id,
      });

      setDates(state => sortDates([...state, response.data]));

      realm.write(() => {
        realm.create('ReleaseDate', response.data, UpdateMode.All);
      });
    },
    [realm],
  );

  const deleteReleseDate = useCallback(
    async (date_id: string) => {
      await api.delete(`/release/dates/${date_id}`);
      setDates(state => state.filter(date => date.id !== date_id));

      realm.write(() => {
        const data = realm.objectForPrimaryKey('ReleaseDate', date_id);
        realm.delete(data);
      });
    },
    [realm],
  );

  return (
    <ReleasesDatesContext.Provider
      value={{
        dates,
        refresh,
        createReleaseDate,
        deleteReleseDate,
      }}
    >
      {children}
    </ReleasesDatesContext.Provider>
  );
}
