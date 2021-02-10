import React, { useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import EmptyList from '../EmptyList';

import { Container, Name } from './styles';

interface ItemProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

const ItemList: React.FC<ItemProps> = ({ items, onRefresh, emptyListText }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(255,255,255,0.75)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
