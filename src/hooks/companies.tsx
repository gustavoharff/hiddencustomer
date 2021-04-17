import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { api, getRealm } from 'services';

import { Company } from 'types';

interface CompaniesContextData {
  companies: Company[];
  loadLocalCompanies: () => Promise<void>;
  loadApiCompanies: () => Promise<void>;
}

interface CompaniesProviderProps {
  children: ReactNode;
}

const CompanyContext = createContext<CompaniesContextData>(
  {} as CompaniesContextData,
);

export function CompaniesProvider({
  children,
}: CompaniesProviderProps): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);

  async function loadLocalCompanies() {
    const realm = await getRealm();

    realm.write(() => {
      const data = realm.objects<Company>('Company');

      const formatedCompanies = data.map(cmpny => {
        return {
          id: cmpny.id,
          name: cmpny.name,
          created_at: cmpny.created_at,
          updated_at: cmpny.updated_at,
        };
      });

      setCompanies(formatedCompanies);
    });
  }

  async function loadApiCompanies() {
    const response = await api.get<Company[]>('/companies');

    setCompanies(response.data);

    const realm = await getRealm();

    realm.write(() => {
      const data = realm.objects('Company');

      realm.delete(data);

      response.data.forEach(company => realm.create('Company', company));
    });
  }

  useEffect(() => {
    loadApiCompanies().catch(() => loadLocalCompanies());
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loadApiCompanies,
        loadLocalCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompanies(): CompaniesContextData {
  const context = useContext(CompanyContext);

  return context;
}
