import React from 'react';
import { View } from 'react-native';
import Customer from '../../schemas/customer';

import { Container, Name } from './styles';

interface ItemProps {
  items: Customer[];
}

const ItemList: React.FC<ItemProps> = ({ items }) => (
  <View>
    {items.map(item => (
      <Container key={item.id}>
        <Name>{item.name}</Name>
      </Container>
    ))}
  </View>
);

export default ItemList;
