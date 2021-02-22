import React from 'react';
import { View } from 'react-native';

import { Image } from './styles';

type AvatarProps = {
  url: string;
  size: number;
};

const Avatar: React.FC<AvatarProps> = ({ url, size }) => (
  <View>
    <Image
      size={size}
      source={{
        uri: url,
      }}
    />
  </View>
);

export { Avatar };
