import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

import { COLORS, SPACING } from 'styles';

import { Header, Content, Title, Description } from './styles';

type ListHeaderProps = {
  title: string;
  description?: string;
  loading?: boolean;
};

const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  description,
  loading,
}) => (
  <Header>
    <Content>
      {loading ? (
        <ActivityIndicator
          size={Platform.OS === 'ios' ? SPACING.XL * 3 : SPACING.L * 2}
          color={COLORS.WHITE}
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

export { ListHeader };
