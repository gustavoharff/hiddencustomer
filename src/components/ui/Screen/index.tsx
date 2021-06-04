import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { SPACING } from 'styles';

interface ScreenProps {
  children: ReactNode;
  keyboard?: boolean;
}

export function Screen({
  children,
  keyboard = false,
}: ScreenProps): JSX.Element {
  return (
    <KeyboardAvoidingView
      enabled={keyboard}
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(true) + SPACING.L * 5
      }
    >
      {children}
    </KeyboardAvoidingView>
  );
}
