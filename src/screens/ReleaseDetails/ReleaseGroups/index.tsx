import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Button } from 'components';

import { api, getRealm } from 'services';

import { ReleaseGroup } from 'types';

import { SPACING } from 'styles';

import { useGroups } from 'hooks';

import { ReleaseGroupsList } from './ReleaseGroupsList';

import { Container } from './styles';

type ReleaseGroupsProps = {
  release_id: string;
};

const ReleaseGroups: React.FC<ReleaseGroupsProps> = ({ release_id }) => {
  const { groups, setGroups } = useGroups();

  const navigation = useNavigation();

  const loadApiGroups = useCallback(async () => {
    if (!release_id) {
      return;
    }

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

  const loadLocalGroups = useCallback(async () => {
    if (!release_id) {
      return;
    }

    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects<ReleaseGroup>('ReleaseGroup')
        .filtered(`release_id == '${release_id}'`);

      const formattedGroups = data.map(group => ({
        id: group.id,
        name: group.name,
        type: group.type,
        release_id: group.release_id,
        created_at: group.created_at,
        updated_at: group.updated_at,
      }));

      setGroups(formattedGroups);
    });
  }, [release_id, setGroups]);

  useEffect(() => {
    loadApiGroups().catch(() => {
      loadLocalGroups();
    });
  }, [loadApiGroups, loadLocalGroups]);

  const onRefresh = useCallback(async () => {
    loadApiGroups().catch(() => {
      loadLocalGroups();
    });
  }, [loadApiGroups, loadLocalGroups]);

  return (
    <Container>
      <ReleaseGroupsList
        groups={groups}
        onRefresh={onRefresh}
        emptyListText="Não há grupos cadastrados!"
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
