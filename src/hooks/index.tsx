import React from 'react';

import { AuthProvider } from './auth';
import { CustomerProvider } from './customers';
import { ReleasesProvider } from './releases';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CustomerProvider>
      <ReleasesProvider>{children}</ReleasesProvider>
    </CustomerProvider>
  </AuthProvider>
);

export default AppProvider;
