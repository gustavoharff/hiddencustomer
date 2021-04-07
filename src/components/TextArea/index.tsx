import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps, View, TextInput } from 'react-native';
import { useField } from '@unform/core';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: object;
}

type InputValueRef = {
  value: string;
};

type InputRef = {
  focus(): void;
};

const ForwardInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, containerStyle, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name); //eslint-disable-line
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
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={inputElementRef}
        style={styles.input}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        textAlignVertical="top"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor="#817E7B"
        {...rest}
      />
    </View>
  );
};

const TextArea = forwardRef(ForwardInput);

export { TextArea };
