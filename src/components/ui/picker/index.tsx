import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { colors, SPACING } from 'styles';

import { styles } from './styles';

interface Option {
  label: string;
  value: string;
}

interface PickerProps {
  items: Option[];
  onChange: (value: string | number) => void | Promise<void>;
  value: string | number;
  doneText: string;
  containerStyle?: ViewStyle;
  androidStyle?: TextStyle;
  label?: string;
  inputMode?: boolean;
}

export function Picker({
  items,
  value,
  onChange,
  doneText,
  containerStyle,
  androidStyle,
  label,
  inputMode = true,
}: PickerProps): JSX.Element {
  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.gray[400],
    width: '90%',
    marginBottom: SPACING.L,
  } as TextStyle;

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, inputMode && inputStyle]}>
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
