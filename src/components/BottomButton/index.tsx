import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SPACING } from 'styles';

import { styles } from './styles';

interface ButtonProps {
  name: string;
  onPress: () => void;
}

export function BottomButton({ name, onPress, ...rest }: ButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
        <Icon name={name} color="#fff" size={SPACING.XL * 2} />
      </TouchableOpacity>
    </View>
  );
}
