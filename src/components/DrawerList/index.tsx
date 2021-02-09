import React from 'react';
import { View } from 'react-native';

import DrawerItem from '../DrawerItem';

interface Item {
  onPress(): void;
  title: string;
  icon: React.FC<{}>;
  canAccess: boolean;
}

interface DrawerListProps {
  items: Item[];
}

const DrawerList: React.FC<DrawerListProps> = ({ items }) => (
  <View>
    {items.map(
      item =>
        item.canAccess && (
          <DrawerItem
            key={item.title}
            Icon={item.icon}
            title={item.title}
            onPress={item.onPress}
          />
        ),
    )}
  </View>
);

export default DrawerList;
