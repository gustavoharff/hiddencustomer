import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Button } from 'components';

import { SPACING } from 'styles';

import { ReleaseGroupsList } from './ReleaseGroupsList';

import { Container } from './styles';

interface ReleaseGroupsProps {
  release_id: string;
}

export function ReleaseGroups({ release_id }: ReleaseGroupsProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <Container>
      <ReleaseGroupsList
        release_id={release_id}
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
