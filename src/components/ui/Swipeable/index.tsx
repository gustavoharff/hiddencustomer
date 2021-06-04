import { ReactNode, useCallback, useState } from 'react';
import RNSwipeable from 'react-native-gesture-handler/Swipeable';

import { OptionItem } from 'components';

import { colors } from 'styles';

interface SwipeableProps {
  children: ReactNode;
  editOption?: boolean;
  editOnPress?: () => void;
  deleteOption?: boolean;
  deleteOnPress?: () => Promise<void>;
  disableOption?: boolean;
  disableOnPress?: () => Promise<void>;
  activeOption?: boolean;
  activeOnPress?: () => Promise<void>;
}

export function Swipeable({
  children,
  editOption = false,
  editOnPress,
  deleteOption = false,
  deleteOnPress,
  disableOption = false,
  disableOnPress,
  activeOption = false,
  activeOnPress,
}: SwipeableProps): JSX.Element {
  const [swipeableRow, setSwipeableRow] = useState<RNSwipeable | null>(null);

  const close = useCallback(() => {
    swipeableRow?.close();
  }, [swipeableRow]);

  return (
    <RNSwipeable
      ref={setSwipeableRow}
      friction={2}
      rightThreshold={30}
      activeOffsetX={-1}
      activeOffsetY={500}
      renderRightActions={() => (
        <>
          {activeOption && (
            <OptionItem
              color={colors.green[300]}
              text="Ativar"
              textColor="light"
              onPress={async () => {
                if (activeOnPress) {
                  await activeOnPress();
                }

                close();
              }}
            />
          )}
          {disableOption && (
            <OptionItem
              color={colors.red[400]}
              text="Desativar"
              textColor="light"
              onPress={async () => {
                if (disableOnPress) {
                  await disableOnPress();
                }

                close();
              }}
            />
          )}
          {deleteOption && (
            <OptionItem
              text="Deletar"
              textColor="light"
              color={colors.red[500]}
              onPress={async () => {
                if (deleteOnPress) {
                  await deleteOnPress();
                }
                close();
              }}
            />
          )}
          {editOption && (
            <OptionItem
              color={colors.orange[300]}
              text="Editar"
              textColor="light"
              onPress={() => {
                if (editOnPress) {
                  editOnPress();
                }
                close();
              }}
            />
          )}
        </>
      )}
    >
      {children}
    </RNSwipeable>
  );
}
