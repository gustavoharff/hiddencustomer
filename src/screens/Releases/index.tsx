import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { BottomButton } from 'components';
import { useAuth, useReleases } from 'hooks';

import { ReleasesList } from './ReleasesList';

import { Container } from './styles';

const Releases: React.FC = () => {
  const { user } = useAuth();

  const {
    releases,
    setReleases,
    loadApiReleases,
    loadLocalReleases,
  } = useReleases();

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  useEffect(() => {
    loadApiReleases().catch(() => {
      loadLocalReleases();
    });
  }, [loadApiReleases, loadLocalReleases]);

  const onRefresh = useCallback(async () => {
    loadApiReleases().catch(() => {
      loadLocalReleases();
    });
  }, [loadApiReleases, loadLocalReleases]);

  return (
    <>
      <Container>
        <ReleasesList
          releases={releases}
          setReleases={setReleases}
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
};

export { Releases };
