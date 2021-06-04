import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScreenIndicator } from 'components';

import { colors } from 'styles';

interface TabBarIconProps {
  name: string;
  size: number;
  focused: boolean;
}

export function TabBarIcon({
  name,
  size,
  focused,
}: TabBarIconProps): JSX.Element {
  return (
    <>
      <Icon
        name={name}
        size={size}
        color={focused ? colors.red[500] : colors.gray[500]}
      />
      {focused && (
        <ScreenIndicator
          backgroundColor={focused ? colors.red[500] : colors.gray[500]}
        />
      )}
    </>
  );
}
