import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { KeyboardAvoiding } from './KeyboardAvoiding';

interface ScreenProps extends ViewProps {
  children: ReactNode;
  keyboard?: boolean;
  keyboardVerticalOffset?: boolean;
}

export function Screen({
  children,
  keyboard = false,
  keyboardVerticalOffset = true,
  ...rest
}: ScreenProps): JSX.Element {
  return (
    <KeyboardAvoiding
      enabled={keyboard}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={{ flex: 1 }} {...rest}>
        {children}
      </View>
    </KeyboardAvoiding>
  );
}
