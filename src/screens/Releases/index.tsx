import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';

import { BottomButton, ReleasesList, ListHeader } from 'components';
import { useAuth, useReleases } from 'hooks';

import { api, getRealm } from 'services';

import { Release } from 'types';

import { Container } from './styles';

const Releases: React.FC = () => {
  const { user } = useAuth();
  const { releases, setReleases } = useReleases();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/releases').then(response => {
      setReleases(response.data);

      getRealm().then(realm => {
        realm.write(() => {
          const data = realm.objects('Release');
          realm.delete(data);

          response.data.map((release: Release) =>
            realm.create('Release', release),
          );
        });
      });
    });
  }, [setReleases]);

  const onRefresh = useCallback(async () => {
    const response = await api.get('/releases');
    setReleases(response.data);

    const realm = await getRealm();
    realm.write(() => {
      const data = realm.objects('Release');
      realm.delete(data);

      response.data.map((release: Release) => realm.create('Release', release));
    });
  }, [setReleases]);

  return (
    <>
      <ListHeader title="Lançamentos" />
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
