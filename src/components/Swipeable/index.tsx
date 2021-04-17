import { ReactNode, useCallback, useState } from 'react';
import RNSwipeable from 'react-native-gesture-handler/Swipeable';

import { ActivateItem, DeleteItem, DisableItem, EditItem } from 'components';

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
          {deleteOption && (
            <DeleteItem
              onPress={async () => {
                if (deleteOnPress) {
                  await deleteOnPress();
                }
                close();
              }}
            />
          )}
          {editOption && (
            <EditItem
              onPress={() => {
                if (editOnPress) {
                  editOnPress();
                }
                close();
              }}
            />
          )}
          {activeOption && (
            <ActivateItem
              onPress={async () => {
                if (activeOnPress) {
                  await activeOnPress();
                }

                close();
              }}
            />
          )}
          {disableOption && (
            <DisableItem
              onPress={async () => {
                if (disableOnPress) {
                  await disableOnPress();
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
