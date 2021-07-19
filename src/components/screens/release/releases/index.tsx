import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { Image, ActivityIndicator } from 'react-native';

import { CircularButton, HeaderIcon, Section, Small } from 'components';

import { useAuth, ReleasesContext } from 'hooks';

import rocketPlusImg from 'assets/icons/rocket-plus-outline.png';

import { colors, SPACING } from 'styles';

import { ReleasesList } from '../../../features/releases-list';

import { Container, Filters } from './styles';
import { ReleasesFilter } from '../releases-filter';

export function Releases(): JSX.Element {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { refresh, setReleases, activeFilter, customerFilter } = useContext(
    ReleasesContext,
  );
  const [loading, setLoading] = useState(true);

  const filters = useMemo(() => {
    let counter = 0;
    if (activeFilter) {
      counter += 1;
    }

    if (customerFilter !== '') {
      counter += 1;
    }

    return counter;
  }, [activeFilter, customerFilter]);

  const { user } = useAuth();

  useEffect(() => {
    refresh().finally(() => {
      setLoading(false);
    });
  }, [refresh]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="filter-outline"
          onPress={() => setFiltersOpen(true)}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [filters, navigation]);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 300);
  }, []);

  const closeFilters = useCallback(() => {
    setFiltersOpen(false);
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
      <Filters>
        <Small dark>{filters} filtro(s) aplicados</Small>
      </Filters>
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

      <ReleasesFilter isVisible={filtersOpen} closeFilters={closeFilters} />
    </Container>
  );
}
