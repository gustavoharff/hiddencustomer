import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Section, CircularButton } from 'components';
import { NumbersList } from 'components/features/numbers-list';

import { api } from 'services';

import { PhoneNumber } from 'types';

export function MyNumbers(): JSX.Element {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);

  useEffect(() => {
    api.get('/numbers').then(response => {
      setNumbers(response.data);
    });
  }, []);

  const navigation = useNavigation();

  return (
    <>
      <Section flex>
        <NumbersList numbers={numbers} setNumbers={setNumbers} />
      </Section>

      <CircularButton
        name="phone-plus"
        onPress={() => {
          navigation.navigate('ProfileStack', {
            screen: 'NumberForm',
            params: {
              setNumbers,
            },
          });
        }}
      />
    </>
  );
}
