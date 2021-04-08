import React, { ReactNode } from 'react';

import {
  AuthProvider,
  CustomerProvider,
  ReleasesProvider,
  GroupProvider,
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
            <ReleasesProvider>
              <GroupProvider>{children}</GroupProvider>
            </ReleasesProvider>
          </CustomerProvider>
        </UsersProvider>
      </CompaniesProvider>
    </AuthProvider>
  );
}
