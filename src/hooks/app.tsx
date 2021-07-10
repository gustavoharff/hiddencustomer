import React, { ReactNode } from 'react';

import {
  RealmProvider,
  AuthProvider,
  CustomerProvider,
  CompaniesProvider,
  ReleasesProvider,
  ReleaseGroupsProvider,
  ReleaseDatesProvider,
} from 'hooks';
import { UsersProvider } from './users';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <RealmProvider>
      <AuthProvider>
        <CompaniesProvider>
          <UsersProvider>
            <CustomerProvider>
              <ReleasesProvider>
                <ReleaseGroupsProvider>
                  <ReleaseDatesProvider>{children}</ReleaseDatesProvider>
                </ReleaseGroupsProvider>
              </ReleasesProvider>
            </CustomerProvider>
          </UsersProvider>
        </CompaniesProvider>
      </AuthProvider>
    </RealmProvider>
  );
}
