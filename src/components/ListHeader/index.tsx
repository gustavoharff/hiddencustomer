import React from 'react';

import { Header, Title, Description } from './styles';

interface ListHeaderProps {
  title: string;
  description?: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ title, description }) => (
  <Header>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Header>
);

export default ListHeader;
