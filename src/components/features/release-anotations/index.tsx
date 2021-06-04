import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { useAuth } from 'hooks';

import { Release } from 'types';

import { Container, Annotation, Content } from './styles';

interface ReleaseAnnotationsProps {
  release: Release;
}

export function ReleaseAnnotations({
  release,
}: ReleaseAnnotationsProps): JSX.Element {
  const [annotations, setAnnotations] = useState(release.annotations);
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="never">
        {annotations ? (
          <Content>
            <Annotation>{annotations}</Annotation>
          </Content>
        ) : (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#47474d',
              }}
            >
              Não há anotações definidas para este lançamento!
            </Text>
          </View>
        )}
      </ScrollView>

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="file-edit-outline"
          onPress={() =>
            navigation.navigate('ReleaseAnnotationsForm', {
              release_id: release.id,
              annotations,
              setAnnotations,
            })
          }
        />
      )}
    </Container>
  );
}
