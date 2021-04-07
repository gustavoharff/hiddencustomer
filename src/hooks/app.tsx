import React, { ReactNode } from 'react';

import {
  AuthProvider,
  CustomerProvider,
  ReleasesProvider,
  GroupProvider,
  UsersProvider,
} from 'hooks';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <UsersProvider>
        <CustomerProvider>
          <ReleasesProvider>
            <GroupProvider>{children}</GroupProvider>
          </ReleasesProvider>
        </CustomerProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
