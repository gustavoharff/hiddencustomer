import React, { useContext, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CircularButton } from 'components';

import { ReleasesContext, useAuth } from 'hooks';

import { Release } from 'types';

import { Container, Annotation, Content } from './styles';

interface ReleaseAnnotationsProps {
  releaseId: string;
}

export function ReleaseAnnotations({
  releaseId,
}: ReleaseAnnotationsProps): JSX.Element {
  const { releases } = useContext(ReleasesContext);

  const release = useMemo(() => {
    return releases.find(reles => reles.id === releaseId) || ({} as Release);
  }, [releaseId, releases]);

  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="never">
        {release.annotations ? (
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

      {(user.permission === 'admin' || user.permission === 'client') && (
        <CircularButton
          name="file-edit-outline"
          onPress={() =>
            navigation.navigate('ReleaseAnnotationsForm', {
              release_id: release.id,
              annotations: release.annotations,
            })
          }
        />
      )}
    </Container>
  );
}
