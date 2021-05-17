import React, { ReactNode } from 'react';

import { AuthProvider, CustomerProvider, CompaniesProvider } from 'hooks';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <CompaniesProvider>
        <CustomerProvider>{children}</CustomerProvider>
      </CompaniesProvider>
    </AuthProvider>
  );
}
