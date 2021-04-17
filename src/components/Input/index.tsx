import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { useField } from '@unform/core';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  containerStyle?: object;
}

type InputValueRef = {
  value: string;
};

type InputRef = {
  focus(): void;
};

const ForwardInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, containerStyle, label, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && (
        <Text style={[styles.label, { textAlign: 'left' }]}>{label}</Text>
      )}
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          style={[
            styles.input,
            isFocused ? { borderWidth: 1 } : { borderWidth: 0 },
          ]}
          placeholderTextColor="#817E7B"
          {...rest}
        />
      </View>
    </>
  );
};

export const Input = forwardRef(ForwardInput);
