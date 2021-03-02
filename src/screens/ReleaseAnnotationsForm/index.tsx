import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import { api } from 'services';

import { TextArea, ListHeader, Button } from 'components';

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

  const { setReleases } = useReleases();

  const handleSubmit = useCallback(
    async data => {
      const response = await api.put(`release/${route.params.release_id}`, {
        annotations: data.annotations,
      });

      setReleases(releases =>
        releases.map(
        release => release.id === route.params.release_id ? { ...release, ...response.data} : release // eslint-disable-line
        ),
      );

      navigation.goBack();
    },
    [route.params.release_id, setReleases, navigation],
  );

  return (
    <Container>
      <ListHeader title="Alterar anotações" />
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
