import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { styles } from './styles';

interface PickerProps {
  items: any[];
  onChange: (value: any) => void | Promise<void>;
  value: any;
  doneText: string;
  containerStyle?: ViewStyle;
  androidStyle?: TextStyle;
}

export function Picker({
  items,
  value,
  onChange,
  doneText,
  containerStyle,
  androidStyle,
}: PickerProps): JSX.Element {
  return (
    <View>
      <RNPickerSelect
        placeholder={{}}
        items={items}
        value={value}
        doneText={doneText}
        onValueChange={onChange}
        useNativeAndroidPickerStyle
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
  );
}
