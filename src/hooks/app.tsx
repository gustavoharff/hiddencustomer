import React, { ReactNode } from 'react';

import {
  AuthProvider,
  CustomerProvider,
  ReleasesProvider,
  UsersProvider,
  CompaniesProvider,
} from 'hooks';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <CompaniesProvider>
        <UsersProvider>
          <CustomerProvider>
            <ReleasesProvider>{children}</ReleasesProvider>
          </CustomerProvider>
        </UsersProvider>
      </CompaniesProvider>
    </AuthProvider>
  );
}
