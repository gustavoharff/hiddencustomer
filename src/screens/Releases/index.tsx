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

  const loadApiReleases = useCallback(async () => {
    const response = await api.get('/releases');
    setReleases(response.data);

    const realm = await getRealm();

    realm.write(() => {
      const data = realm.objects('Release');
      realm.delete(data);

      response.data.map((release: Release) => realm.create('Release', release));
    });
  }, [setReleases]);

  const loadLocalReleases = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Release>('Release').sorted('name', true);

    const formattedReleases = data.map(release => ({
      id: release.id,
      name: release.name,
      customer_id: release.customer_id,
      company_id: release.company_id,
      paid: release.paid,
      annotations: release.annotations,
      created_at: release.created_at,
      updated_at: release.updated_at,
    }));

    setReleases(formattedReleases);
  }, [setReleases]);

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
