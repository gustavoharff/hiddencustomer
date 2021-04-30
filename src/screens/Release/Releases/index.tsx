import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Image, Platform, View } from 'react-native';

import { CircularButton, HeaderIcon } from 'components';

import { useAuth, useReleases } from 'hooks';

import { colors, SPACING } from 'styles';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { ReleasesList } from './ReleasesList';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const { user } = useAuth();
  const { isLoading, isFetching } = useReleases();

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
          <HeaderIcon
            name="filter-outline"
            onPress={() => navigation.navigate('ReleasesFilter')}
            style={{ marginRight: SPACING.S }}
          />
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
        <ReleasesList />
      </Container>
      {user.permission !== 'user' && (
        <CircularButton
          name="plus"
          Image={<Image source={rocketPlusImg} />}
          onPress={() => navigation.navigate('ReleaseForm')}
        />
      )}
    </>
  );
}
