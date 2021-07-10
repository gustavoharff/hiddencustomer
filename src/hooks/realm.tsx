import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

import { getRealm } from 'services';

interface RealmContextData {
  realm: Realm;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const RealmContext = createContext<RealmContextData>(
  {} as RealmContextData,
);

export function RealmProvider({ children }: AuthProviderProps): JSX.Element {
  const [realm, setRealm] = useState<Realm>({} as Realm);

  async function loadRealm() {
    const realmInstance = await getRealm();

    setRealm(realmInstance);
  }

  useEffect(() => {
    loadRealm();
  }, []);

  return (
    <RealmContext.Provider value={{ realm }}>{children}</RealmContext.Provider>
  );
}

export function useRealm(): RealmContextData {
  const context = useContext(RealmContext);

  return context;
}
