import React from 'react';
import { View } from 'react-native';

import { DrawerItem } from 'components';
import { SPACING } from 'styles';

type Item = {
  onPress(): void;
  title: string;
  icon: React.FC<{}>;
  canAccess: boolean;
};

type DrawerListProps = {
  items: Item[];
};

const DrawerList: React.FC<DrawerListProps> = ({ items }) => (
  <View style={{ marginTop: SPACING.XL }}>
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

export { DrawerList };
