import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { TextArea, Button } from 'components';

import { useReleases } from 'hooks';

import { SPACING } from 'styles';

import { Container, Unform } from './styles';

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

  const { updateReleaseAnnotations } = useReleases();

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        await updateReleaseAnnotations({
          release_id: route.params.release_id,
          annotations: data.annotations,
        });

        navigation.goBack();
      } catch {
        setLoading(false);
      }
    },
    [route.params.release_id, updateReleaseAnnotations, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(false) + SPACING.L * 5
      }
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Unform
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={route.params}
          >
            <TextArea name="annotations" multiline numberOfLines={50} />
          </Unform>
        </Container>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          loading={loading}
          title="Salvar"
          onPress={() => formRef.current?.submitForm()}
          style={{ marginBottom: SPACING.M }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
