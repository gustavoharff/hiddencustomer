import React, { ReactNode, useContext } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

interface KeyboardAvoidingProps {
  enabled: boolean;
  keyboardVerticalOffset: boolean;
  children: ReactNode;
}

export function KeyboardAvoiding({
  enabled,
  keyboardVerticalOffset,
  children,
}: KeyboardAvoidingProps): JSX.Element {
  const headerHeight = useContext(HeaderHeightContext);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={
        keyboardVerticalOffset && Number(headerHeight)
          ? 64 + Number(headerHeight) / 2.5
          : 0
      }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
