import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import { TextArea, Button, Screen } from 'components';

import { SPACING } from 'styles';

import { ReleasesContext } from 'hooks';

import { Unform } from './styles';

type Params = {
  ReleaseAnnotationsForm: {
    release_id: string;
    annotations: string;
  };
};

type ReleaseAnnotationsFormProps = StackScreenProps<
  Params,
  'ReleaseAnnotationsForm'
>;

export function ReleaseAnnotationsForm({
  route,
}: ReleaseAnnotationsFormProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { updateRelease } = useContext(ReleasesContext);

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);
      try {
        await updateRelease({
          release_id: route.params.release_id,
          annotations: data.annotations,
        });

        navigation.goBack();
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    },
    [updateRelease, route.params.release_id, navigation],
  );

  return (
    <Screen keyboard>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Unform
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={route.params}
        >
          <TextArea name="annotations" multiline numberOfLines={40} />
        </Unform>
      </ScrollView>

      <Button
        loading={loading}
        title="Salvar"
        onPress={() => formRef.current?.submitForm()}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
