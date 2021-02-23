import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { ReleaseGroupsList, Button } from 'components';

import { api, getRealm } from 'services';

import { ReleaseGroup } from 'types';

import { SPACING } from 'styles';

import { useGroups } from 'hooks';

import { Container } from './styles';

type ReleaseGroupsProps = {
  release_id: string;
};

const ReleaseGroups: React.FC<ReleaseGroupsProps> = ({ release_id }) => {
  const { groups, setGroups } = useGroups();

  const navigation = useNavigation();

  useEffect(() => {
    getRealm().then(realm => {
      realm.write(() => {
        const data = realm
          .objects<ReleaseGroup>('ReleaseGroup')
          .filtered(`release_id = '${release_id}'`);
        setGroups(data as any);
      });
    });
  }, [release_id, setGroups]);

  const onRefresh = useCallback(async () => {
    const response = await api.get(`/release/groups/${release_id}`);

    setGroups(response.data);

    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects('ReleaseGroup')
        .filtered(`release_id == '${release_id}'`);

      realm.delete(data);
      response.data.map((releaseGroup: ReleaseGroup) =>
        realm.create('ReleaseGroup', releaseGroup),
      );
    });
  }, [release_id, setGroups]);

  return (
    <Container>
      <ReleaseGroupsList
        groups={groups}
        onRefresh={onRefresh}
        emptyListText="Não há datas!"
      />

      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          title="Adicionar grupo"
          onPress={() =>
            navigation.navigate('ReleaseGroupForm', { release_id })
          }
          style={{ marginBottom: SPACING.XL }}
        />
      </View>
    </Container>
  );
};
export { ReleaseGroups };
