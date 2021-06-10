import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { KeyboardAvoiding } from './KeyboardAvoiding';

interface ScreenProps {
  children: ReactNode;
  keyboard?: boolean;
  keyboardVerticalOffset?: boolean;
}

export function Screen({
  children,
  keyboard = false,
  keyboardVerticalOffset = true,
}: ScreenProps): JSX.Element {
  return (
    <KeyboardAvoiding
      enabled={keyboard}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAvoiding>
  );
}
