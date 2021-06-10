import React from 'react';
import { View } from 'react-native';

import { Image } from './styles';

interface AvatarProps {
  url: string;
  size: number;
}

export function Avatar({ url, size }: AvatarProps): JSX.Element {
  return (
    <View>
      <Image
        size={size}
        source={{
          uri: url,
        }}
      />
    </View>
  );
}
