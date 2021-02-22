import React from 'react';

import { AuthProvider, CustomerProvider, ReleasesProvider } from 'hooks';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CustomerProvider>
      <ReleasesProvider>{children}</ReleasesProvider>
    </CustomerProvider>
  </AuthProvider>
);

export { AppProvider };
