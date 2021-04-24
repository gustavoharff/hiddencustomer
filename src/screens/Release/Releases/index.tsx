import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Image, Platform, Text } from 'react-native';

import { CircularButton } from 'components';

import { useAuth, useReleases } from 'hooks';

import { colors } from 'styles';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { ReleasesList } from './ReleasesList';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const { releases, loadApiReleases, loadLocalReleases } = useReleases();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ color: colors.gray[500], marginRight: 20 }}>
          {releases.length ?? 0} lançamento(s)
        </Text>
      ),
    });
  }, [navigation, releases]);

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
          color={Platform.OS === 'ios' ? colors.gray[800] : colors.red[500]}
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
        <CircularButton
          name="plus"
          Image={<Image source={rocketPlusImg} />}
          onPress={() => navigation.navigate('ReleaseForm')}
        />
      )}
    </>
  );
}
