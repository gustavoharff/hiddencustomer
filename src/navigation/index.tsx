import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from 'hooks';

import { AuthRoutes } from './auth.routes';
import { DrawerNavigation } from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <DrawerNavigation /> : <AuthRoutes />;
};

export default Routes;
