import React from 'react';

import { Header, Content, Title, Description } from './styles';

interface ListHeaderProps {
  title: string;
  description?: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ title, description }) => (
  <Header>
    <Content>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Content>
  </Header>
);

export default ListHeader;
