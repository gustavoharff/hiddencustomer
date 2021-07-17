import { Form } from '@unform/mobile';
import styled from 'styled-components/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${COLORS.FONT};
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  font-family: 'Arial';
`;

export const HeaderContent = styled.Text`
  color: ${COLORS.FONT_LIGHT};
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  font-family: 'Arial';
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;

export const ForgotPassword = styled.Text`
  color: #fff;
  margin-top: 15px;
`;

export const GoogleButton = styled(GoogleSigninButton)`
  height: ${SPACING.XXL * 2}px;
  width: 90%;

  margin-top: 15px;
`;
