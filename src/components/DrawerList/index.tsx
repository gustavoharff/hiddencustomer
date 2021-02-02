import React from 'react';
import { View } from 'react-native';

import DrawerItem from '../DrawerItem';

interface Item {
  onPress(): void;
  title: string;
  icon: React.FC<{}>;
}

interface DrawerListProps {
  items: Item[];
}

const DrawerList: React.FC<DrawerListProps> = ({ items }) => (
  <View>
    {items.map(item => (
      <DrawerItem Icon={item.icon} title={item.title} onPress={item.onPress} />
    ))}
  </View>
);

export default DrawerList;
