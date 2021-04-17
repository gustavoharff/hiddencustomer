import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Button } from 'components';

import { SPACING } from 'styles';

import { Release } from 'types';

import { ReleaseGroupsList } from './ReleaseGroupsList';

import { Container } from './styles';

interface ReleaseGroupsProps {
  release: Release;
}

export function ReleaseGroups({ release }: ReleaseGroupsProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <Container>
      <ReleaseGroupsList
        release_id={release.id}
        emptyListText="Não há grupos cadastrados!"
      />

      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          title="Adicionar grupo"
          onPress={() =>
            navigation.navigate('ReleaseGroupForm', { release_id: release.id })
          }
          style={{ marginBottom: SPACING.XL }}
        />
      </View>
    </Container>
  );
}
