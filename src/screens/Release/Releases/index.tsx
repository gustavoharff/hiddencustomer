import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Image, Platform } from 'react-native';

import { CircularButton, HeaderIcon } from 'components';

import { useAuth } from 'hooks';

import { colors, SPACING } from 'styles';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { ReleasesList } from './ReleasesList';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-outline"
          onPress={() => navigation.navigate('ReleasesFilter')}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  if (loading) {
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
