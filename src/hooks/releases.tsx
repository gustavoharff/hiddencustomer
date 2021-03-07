import React, { createContext, useState, useContext, useCallback } from 'react';
import { api, getRealm } from 'services';

import { Release } from 'types';

type ReleasesContextData = {
  releases: Release[];
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
  loadApiReleases: () => Promise<void>;
  loadLocalReleases: () => Promise<void>;
};

const ReleasesContext = createContext<ReleasesContextData>(
  {} as ReleasesContextData,
);

const ReleasesProvider: React.FC = ({ children }) => {
  const [releases, setReleases] = useState<Release[]>([]);

  const loadApiReleases = useCallback(async () => {
    const response = await api.get('/releases');
    setReleases(response.data);

    const realm = await getRealm();

    realm.write(() => {
      const data = realm.objects('Release');
      realm.delete(data);

      response.data.map((release: Release) => realm.create('Release', release));
    });
  }, [setReleases]);

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

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        setReleases,
        loadApiReleases,
        loadLocalReleases,
      }}
    >
      {children}
    </ReleasesContext.Provider>
  );
};

function useReleases(): ReleasesContextData {
  const context = useContext(ReleasesContext);

  if (!context) {
    throw new Error('useReleases must be used within an ReleasesProvider');
  }

  return context;
}

export { ReleasesProvider, useReleases };
