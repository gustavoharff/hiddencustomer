import { PickerIOS as Picker } from '@react-native-picker/picker';
import { Button } from 'components/Button';
import Modal from 'react-native-modal';
import { colors, SPACING } from 'styles';

import { ButtonContainer, Container } from './styles';

interface PickerIOSProps {
  modalIsVisible: boolean;
  modalOnBackdropPress: () => void;
  selectedValue: string;
  onValueChange: (value: any) => void;
  items: any[];
  nameProp: string;
  valueProp: string;
  buttonOnPress: () => void;
}

export function PickerIOS({
  modalIsVisible,
  modalOnBackdropPress,
  selectedValue,
  onValueChange,
  items,
  nameProp,
  valueProp,
  buttonOnPress,
}: PickerIOSProps): JSX.Element {
  return (
    <Modal isVisible={modalIsVisible} onBackdropPress={modalOnBackdropPress}>
      <Container>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{
            color: colors.gray[850],
            marginHorizontal: SPACING.L,
          }}
        >
          <Picker.Item
            color={colors.gray[900]}
            label="Selecionar..."
            value={undefined}
          />

          {items.map(item => (
            <Picker.Item
              color={colors.gray[900]}
              key={item[valueProp]}
              label={item[nameProp]}
              value={item[valueProp]}
            />
          ))}
        </Picker>
        <ButtonContainer>
          <Button
            title="Selecionar"
            style={{ marginBottom: 20 }}
            onPress={buttonOnPress}
          />
        </ButtonContainer>
      </Container>
    </Modal>
  );
}
