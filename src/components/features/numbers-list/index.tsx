import React, { useState, useCallback } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';

import { Section, Swipeable } from 'components';
import { EmptyList, Small, Tiny } from 'components/ui';

import { PhoneNumber } from 'types';
import { formatTelephone } from 'utils';

import { api } from 'services';

interface NumbersListProps {
  numbers: PhoneNumber[];
  setNumbers: React.Dispatch<React.SetStateAction<PhoneNumber[]>>;
}

export function NumbersList({
  numbers,
  setNumbers,
}: NumbersListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.get('/numbers');
    setNumbers(response.data);
    setRefreshing(false);
  }, [setNumbers]);

  const onDeleteItem = useCallback(
    async (numberId: string) => {
      async function remove() {
        await api.delete(`/numbers/${numberId}`);
        setNumbers(state => state.filter(number => number.id !== numberId));
      }

      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
          {
            text: 'Cancelar',
            onPress: () => {
              return resolve(200);
            },
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await remove();
              return resolve(200);
            },
          },
        ]);
      });
    },
    [setNumbers],
  );

  return (
    <Section flex>
      <FlatList
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        ListEmptyComponent={<EmptyList text="Não há números cadastrados!" />}
        data={numbers}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        renderItem={({ item: number }) => (
          <Section paddingHorizontal marginTop>
            <Swipeable
              deleteOption
              deleteOnPress={async () => {
                await onDeleteItem(number.id);
              }}
            >
              <Section background paddingVertical paddingHorizontal>
                {number.name ? <Tiny dark>{number.name}</Tiny> : null}
                <Small dark>{formatTelephone(number.phone_number)}</Small>
              </Section>
            </Swipeable>
          </Section>
        )}
      />
    </Section>
  );
}
