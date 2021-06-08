import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EmptyList, Section } from 'components';

import { SPACING } from 'styles';

import { ReleaseGroup } from 'types';

import { Content, Title } from './styles';

interface ReleseDateGroupsListProps {
  groups: ReleaseGroup[];
}

export function ReleaseDateGroupsList({
  groups,
}: ReleseDateGroupsListProps): JSX.Element {
  return (
    <Section flex>
      <FlatList
        ListEmptyComponent={
          <EmptyList text="Não há grupos cadastrados para essa data." />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={groups}
        renderItem={({ item: group, index }) => (
          <Section
            paddingHorizontal
            paddingVertical
            style={{ paddingTop: index !== 0 ? 0 : 16 }}
          >
            <Content>
              <Title>{group.name}</Title>

              {group.type === 'discord' && (
                <Icon name="discord" color="#7289d9" size={SPACING.L * 1.5} />
              )}
              {group.type === 'whatsapp' && (
                <Icon name="whatsapp" color="#25D366" size={SPACING.L * 1.5} />
              )}
              {group.type === 'telegram' && (
                <Icon name="telegram" color="#0088cc" size={SPACING.L * 1.5} />
              )}
            </Content>
          </Section>
        )}
      />
    </Section>
  );
}
