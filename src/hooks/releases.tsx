import React, { createContext, useState, useContext } from 'react';

import { Release } from 'types';

type ReleasesContextData = {
  releases: Release[];
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
};

const ReleasesContext = createContext<ReleasesContextData>(
  {} as ReleasesContextData,
);

const ReleasesProvider: React.FC = ({ children }) => {
  const [releases, setReleases] = useState<Release[]>([]);

  return (
    <ReleasesContext.Provider
      value={{
        releases,
        setReleases,
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
