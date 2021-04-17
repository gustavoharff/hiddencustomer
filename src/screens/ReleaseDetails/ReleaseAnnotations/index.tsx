import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BottomButton } from 'components';

import { useReleases } from 'hooks';

import { Container, Annotation, Content } from './styles';

interface ReleaseAnnotationsProps {
  release_id: string;
}

export function ReleaseAnnotations({
  release_id,
}: ReleaseAnnotationsProps): JSX.Element {
  const navigation = useNavigation();
  const { releases } = useReleases();

  const release = useMemo(() => {
    return releases.find(rls => rls.id === release_id);
  }, [release_id, releases]);

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="never">
        {release?.annotations ? (
          <Content>
            <Annotation>{release.annotations}</Annotation>
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
      <BottomButton
        name="file-edit-outline"
        onPress={() =>
          navigation.navigate('ReleaseAnnotationsForm', {
            release_id: release?.id,
            annotations: release?.annotations,
          })
        }
      />
    </Container>
  );
}
