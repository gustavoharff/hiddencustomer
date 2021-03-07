import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BottomButton } from 'components';
import { Release } from 'types';

import { useReleases } from 'hooks';

import { Container, Annotation, Content } from './styles';

type ReleaseAnnotationsProps = {
  release_id: string;
};

const ReleaseAnnotations: React.FC<ReleaseAnnotationsProps> = ({
  release_id,
}) => {
  const navigation = useNavigation();
  const [release, setRelease] = useState<Release>({} as Release);

  const { releases } = useReleases();

  useEffect(() => {
    const findedRelease = releases.find(r => r.id === release_id);

    if (findedRelease) {
      setRelease(findedRelease);
    }
  }, [release_id, releases]);

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
      <BottomButton
        name="file-edit-outline"
        onPress={() =>
          navigation.navigate('ReleaseAnnotationsForm', {
            release_id: release.id,
            annotations: release.annotations,
          })
        }
      />
    </Container>
  );
};

export { ReleaseAnnotations };
