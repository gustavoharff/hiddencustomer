import React from 'react';

import {
  AuthProvider,
  CustomerProvider,
  ReleasesProvider,
  GroupProvider,
  UsersProvider,
} from 'hooks';

const AppProvider: React.FC = ({ children }) => (
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

export { AppProvider };
