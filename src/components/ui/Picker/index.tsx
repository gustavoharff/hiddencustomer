import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { styles } from './styles';

interface PickerProps {
  items: any[];
  onChange: (value: any) => void | Promise<void>;
  value: any;
  doneText: string;
  containerStyle?: ViewStyle;
  androidStyle?: TextStyle;
  label?: string;
}

export function Picker({
  items,
  value,
  onChange,
  doneText,
  containerStyle,
  androidStyle,
  label,
}: PickerProps): JSX.Element {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        <RNPickerSelect
          placeholder={{}}
          items={items}
          value={value}
          doneText={doneText}
          onValueChange={onChange}
          style={{
            chevron: {
              display: 'none',
            },
            inputAndroid: { ...styles.selectAndroid, ...androidStyle },
            inputIOS: { ...styles.selectIOS },
            viewContainer: {
              ...containerStyle,
            },
          }}
        />
      </View>
    </>
  );
}
