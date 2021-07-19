import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'styles';

export const Container = styled.View`
  padding: 16px;
  background-color: ${colors.white};
`;

export const Header = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${colors.gray[500]};

  background-color: ${colors.white};

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  flex-direction: row;
  justify-content: space-between;
`;

export const KnobContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 8px;
`;

export const Knob = styled.TouchableOpacity`
  background-color: ${colors.gray[500]};
  border-radius: 10px;
  width: 50px;
  height: 7px;
`;

export const Item = styled.View`
  padding: 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 60px;

  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
`;

export const OptionText = styled.Text`
  max-width: 70%;
`;
