import React from 'react';

import {
  AuthProvider,
  CustomerProvider,
  ReleasesProvider,
  GroupProvider,
} from 'hooks';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CustomerProvider>
      <ReleasesProvider>
        <GroupProvider>{children}</GroupProvider>
      </ReleasesProvider>
    </CustomerProvider>
  </AuthProvider>
);

export { AppProvider };
