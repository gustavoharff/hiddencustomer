import React from 'react';

import { AuthProvider } from './auth';
import { CustomerProvider } from './customers';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CustomerProvider>{children}</CustomerProvider>
  </AuthProvider>
);

export default AppProvider;
