import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Platform } from 'react-native';
import { BottomButton } from 'components';
import { useAuth, useReleases } from 'hooks';

import { COLORS } from 'styles';

import { ReleasesList } from './ReleasesList';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const { loadApiReleases, loadLocalReleases } = useReleases();

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  useEffect(() => {
    loadApiReleases()
      .catch(() => loadLocalReleases())
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    loadApiReleases().catch(() => loadLocalReleases());
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator
          color={Platform.OS === 'ios' ? COLORS.BACKGROUND_LIGHT : COLORS.ALERT}
          size={30}
        />
      </Center>
    );
  }

  return (
    <>
      <Container>
        <ReleasesList
          onRefresh={onRefresh}
          emptyListText="Nenhum lançamento cadastrado."
        />
      </Container>
      {user.permission !== 'user' && (
        <BottomButton
          name="plus"
          onPress={() => navigation.navigate('ReleaseForm')}
        />
      )}
    </>
  );
}
