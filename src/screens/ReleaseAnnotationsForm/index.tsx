import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import { TextArea, Button } from 'components';

import { useReleases } from 'hooks';

import { Container, Unform } from './styles';

type Params = {
  ReleaseAnnotationsForm: {
    release_id: string;
    annotations: string;
  };
};

type Props = StackScreenProps<Params, 'ReleaseAnnotationsForm'>;

const ReleaseAnnotationsForm: React.FC<Props> = ({ route }) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { updateReleaseAnnotations } = useReleases();

  const handleSubmit = useCallback(
    async data => {
      await updateReleaseAnnotations({
        release_id: route.params.release_id,
        annotations: data.annotations,
      });

      navigation.goBack();
    },
    [route.params.release_id, updateReleaseAnnotations, navigation],
  );

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={70}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Unform
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={route.params}
          >
            <TextArea
              name="annotations"
              multiline
              numberOfLines={50}
              style={{ flex: 1 }}
            />

            <Button
              title="Salvar"
              onPress={() => formRef.current?.submitForm()}
            />
          </Unform>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export { ReleaseAnnotationsForm };
