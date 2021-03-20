import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Platform, View } from 'react-native';

import { Button } from 'components';

import { COLORS, SPACING } from 'styles';

import { useGroups } from 'hooks';

import { ReleaseGroupsList } from './ReleaseGroupsList';

import { Container, Center } from './styles';

type ReleaseGroupsProps = {
  release_id: string;
};

export function ReleaseGroups({ release_id }: ReleaseGroupsProps) {
  const [loading, setLoading] = useState(true);

  const { groups, loadApiGroups, loadLocalGroups } = useGroups();

  const navigation = useNavigation();

  useEffect(() => {
    loadApiGroups(release_id)
      .catch(() => {
        loadLocalGroups(release_id);
      })
      .finally(() => setLoading(false));
  }, [loadApiGroups, loadLocalGroups, release_id]);

  const onRefresh = useCallback(async () => {
    loadApiGroups(release_id).catch(() => {
      loadLocalGroups(release_id);
    });
  }, [loadApiGroups, loadLocalGroups, release_id]);

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
}
