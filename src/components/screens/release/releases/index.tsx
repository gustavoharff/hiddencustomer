import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { Image } from 'react-native';

import { CircularButton } from 'components';

import { useAuth, ReleasesContext } from 'hooks';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { ReleasesList } from '../../../features/releases-list';

import { Container, Center } from './styles';

export function Releases(): JSX.Element {
  const { refresh, setReleases } = useContext(ReleasesContext);

  const { user } = useAuth();

  useEffect(() => {
    refresh();
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
