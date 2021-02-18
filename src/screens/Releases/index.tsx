import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';

import BottomButton from '../../components/BottomButton';
import { ReleasesList } from '../../components/ReleasesList';
import ListHeader from '../../components/ListHeader';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container } from './styles';
import { useReleases } from '../../hooks/releases';

const Releases: React.FC = () => {
  const { user } = useAuth();
  const { releases, setReleases } = useReleases();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/releases').then(response => {
      setReleases(response.data);
    });
  }, [setReleases]);

  const onRefresh = useCallback(async () => {
    const response = await api.get('/releases');
    setReleases(response.data);
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
          onPress={() => navigation.navigate('AddRelease')}
        />
      )}
    </>
  );
};

export default Releases;
