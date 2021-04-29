import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { BODY, colors } from 'styles';

export const Container = styled.View`
  padding: 16px;
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

export const OptionText = styled.Text``;

export const PickerContainer = styled.View``;

export const styles = StyleSheet.create({
  selectIOS: {
    flex: 1,
    height: 50,
    fontWeight: '500',
    color: colors.gray[600],
    fontSize: BODY.M.SIZE,
  },
  selectAndroid: {
    height: 50,
    width: 150,
    fontWeight: '500',
    color: colors.gray[600],
  },
  selectContainer: {
    alignItems: 'flex-end',
  },
});
