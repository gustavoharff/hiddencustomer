import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Image, Platform, View } from 'react-native';
import { useQuery } from 'react-query';

import { CircularButton } from 'components';

import { useAuth } from 'hooks';

import { colors, SPACING } from 'styles';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { Release } from 'types';

import { api } from 'services';

import { ReleasesList } from '../../../features/releases-list';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const [releases, setReleases] = useState<Release[]>([]);

  const { isLoading, isFetching } = useQuery(
    'releases',
    async () => {
      const response = await api.get('/releases');
      setReleases(response.data);
    },
    {
      refetchInterval: 1800 * 15,
      refetchOnWindowFocus: true,
    },
  );

  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {isFetching && (
            <ActivityIndicator
              color={colors.red[500]}
              size={30}
              style={{ marginRight: SPACING.S }}
            />
          )}
          {/* <HeaderIcon
            name="filter-outline"
            onPress={() => navigation.navigate('ReleasesFilter')}
            style={{ marginRight: SPACING.S }}
          /> */}
        </View>
      ),
    });
  }, [navigation, isFetching]);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator
          color={Platform.OS === 'ios' ? colors.gray[800] : colors.red[500]}
          size={30}
        />
      </Center>
    );
  }

  return (
    <>
      <Container>
        <ReleasesList releases={releases} setReleases={setReleases} />
      </Container>
      {user.permission !== 'user' && (
        <CircularButton
          name="plus"
          Image={<Image source={rocketPlusImg} />}
          onPress={() =>
            navigation.navigate('ReleaseForm', {
              type: 'create',
              setReleases,
            })
          }
        />
      )}
    </>
  );
}
