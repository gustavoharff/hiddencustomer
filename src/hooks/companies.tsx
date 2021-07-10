import React, { createContext, useState, ReactNode, useCallback } from 'react';

import { api } from 'services';

import { Company } from 'types';
import { useRealm } from './realm';

interface CompaniesContextData {
  companies: Company[];
  refresh: () => Promise<void>;
}

interface CompaniesProviderProps {
  children: ReactNode;
}

export const CompanyContext = createContext<CompaniesContextData>(
  {} as CompaniesContextData,
);

export function CompaniesProvider({
  children,
}: CompaniesProviderProps): JSX.Element {
  const { realm } = useRealm();

  const [companies, setCompanies] = useState<Company[]>([]);

  const refresh = useCallback(async () => {
    try {
      const response = await api.get<Company[]>('/companies');

      setCompanies(response.data);

      realm.write(() => {
        const data = realm.objects('Company');

        realm.delete(data);

        response.data.forEach(company => realm.create('Company', company));
      });
    } catch {
      realm.write(() => {
        const data = realm.objects<Company>('Company');

        setCompanies(
          data.map(cmpny => ({
            id: cmpny.id,
            name: cmpny.name,
            created_at: cmpny.created_at,
            updated_at: cmpny.updated_at,
          })),
        );
      });
    }
  }, [realm]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        refresh,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
