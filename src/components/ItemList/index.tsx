import React, { useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Customer from '../../schemas/customer';
import api from '../../services/api';
import { Container, Name } from './styles';

interface ItemProps {
  items: Customer[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const ItemList: React.FC<ItemProps> = ({ items, setItems }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const response = await api.get('/customers/me');

    setItems(response.data);
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor="rgba(255,255,255,0.75)"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={items}
        renderItem={({ item }) => (
          <Container>
            <Name>{item.name}</Name>
          </Container>
        )}
      />
    </View>
  );
};

export default ItemList;
