import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { Image, ActivityIndicator } from 'react-native';

import { CircularButton } from 'components';

import { useAuth, ReleasesContext } from 'hooks';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { colors } from 'styles';

import { Section } from 'components/ui';

import { ReleasesList } from '../../../features/releases-list';

import { Container } from './styles';

export function Releases(): JSX.Element {
  const { refresh, setReleases } = useContext(ReleasesContext);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    refresh().finally(() => {
      setLoading(false);
    });
  }, [refresh]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <View style={{ flexDirection: 'row' }}>
  //         {/* <HeaderIcon
  //           name="filter-outline"
  //           onPress={() => navigation.navigate('ReleasesFilter')}
  //           style={{ marginRight: SPACING.S }}
  //         /> */}
  //       </View>
  //     ),
  //   });
  // }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  if (loading) {
    return (
      <Section flex alignCenter justifyCenter>
        <ActivityIndicator color={colors.gray[700]} />
      </Section>
    );
  }

  return (
    <Container>
      <ReleasesList />

      {user.permission !== 'user' && (
        <CircularButton
          name="plus"
          Image={<Image source={rocketPlusImg} />}
          onPress={() =>
            navigation.navigate('ReleasesStack', {
              screen: 'ReleaseForm',
              params: {
                type: 'create',
                setReleases,
              },
            })
          }
        />
      )}
    </Container>
  );
}
