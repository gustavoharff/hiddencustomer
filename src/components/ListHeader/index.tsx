import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

import { colors, SPACING } from 'styles';

import { Header, Content, Title, Description } from './styles';

interface ListHeaderProps {
  title: string;
  description?: string;
  loading?: boolean;
}

export function ListHeader({
  title,
  description,
  loading,
}: ListHeaderProps): JSX.Element {
  return (
    <Header>
      <Content>
        {loading ? (
          <ActivityIndicator
            size={Platform.OS === 'ios' ? SPACING.XL * 3 : SPACING.L * 1.5}
            color={colors.white}
          />
        ) : (
          <>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
          </>
        )}
      </Content>
    </Header>
  );
}
