import React, { useCallback, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import { TextArea, Button, Screen } from 'components';

import { SPACING } from 'styles';

import { api } from 'services';
import { Unform } from './styles';

type Params = {
  ReleaseAnnotationsForm: {
    release_id: string;
    annotations: string;
    setAnnotations: React.Dispatch<React.SetStateAction<string>>;
  };
};

type ReleaseAnnotationsFormProps = StackScreenProps<
  Params,
  'ReleaseAnnotationsForm'
>;

export function ReleaseAnnotationsForm({
  route,
}: ReleaseAnnotationsFormProps): JSX.Element {
  const { setAnnotations } = route.params;
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        const response = await api.put(`/release/${route.params.release_id}`, {
          annotations: data.annotations,
        });

        setAnnotations(response.data.annotations);

        navigation.goBack();
      } catch {
        setLoading(false);
      }
    },
    [route.params.release_id, setAnnotations, navigation],
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
