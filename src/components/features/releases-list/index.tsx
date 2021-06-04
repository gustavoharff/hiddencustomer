import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { EmptyList, Swipeable } from 'components';

import { useAuth } from 'hooks';

import { Release } from 'types';

import { api } from 'services';

import {
  Container,
  Content,
  Title,
  Description,
  Item,
  Top,
  Bottom,
  BottomContent,
  TimeContent,
  TimeText,
} from './styles';

interface ReleasesListProps {
  releases: Release[];
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
}

export function ReleasesList({
  releases,
  setReleases,
}: ReleasesListProps): JSX.Element {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteRelease = useCallback(
    async (releaseId: string) => {
      async function remove() {
        await api.delete(`/release/${releaseId}`);

        setReleases(state => state.filter(release => release.id !== releaseId));
      }
      return new Promise(resolve => {
        Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
          {
            text: 'Cancelar',
            onPress: () => resolve(200),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await remove();
              return resolve(200);
            },
          },
        ]);
      });
    },
    [setReleases],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.get('/releases');

    setReleases(response.data);
    setRefreshing(false);
  }, [setReleases]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Nenhum lançamento cadastrado." />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={releases}
        renderItem={({ item: release, index }) => (
          <Container
            style={{ paddingTop: index !== 0 ? 0 : 16 }}
            past={
              release.dates.length >= 1 && release.dates[0]?.date
                ? moment(release.dates[0].date).isBefore(new Date())
                : false
            }
          >
            <Top>
              <Swipeable
                editOption={
                  user.permission === 'admin' || user.permission === 'client'
                }
                editOnPress={() =>
                  navigation.navigate('ReleaseForm', {
                    type: 'update',
                    release,
                    setReleases,
                  })
                }
                deleteOption={
                  user.permission === 'admin' || user.permission === 'client'
                }
                deleteOnPress={async () => {
                  await handleDeleteRelease(release.id);
                }}
              >
                <RectButton
                  onPress={() => {
                    navigation.navigate('ReleasesStack', {
                      screen: 'ReleaseDetails',
                      params: {
                        release,
                      },
                    });
                  }}
                >
                  <Content>
                    <View>
                      <Title numberOfLines={1}>{release.customer?.name}</Title>

                      <Description>{release.name}</Description>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Item>
                        <Title>Pagamento</Title>
                        <Description
                          style={{
                            color: release.paid ? '#03B252' : '#DC1637',
                          }}
                        >
                          {release.paid ? 'Realizado' : 'Não realizado'}
                        </Description>
                      </Item>
                      <Item>
                        <Title>Datas</Title>
                        <Description>{release.dates.length}</Description>
                      </Item>
                      <Item>
                        <Title>Grupos</Title>
                        <Description>{release.groups.length}</Description>
                      </Item>
                    </View>
                  </Content>
                </RectButton>
              </Swipeable>
            </Top>
            {release.dates.length >= 1 && (
              <Bottom>
                <BottomContent
                  between={moment(new Date()).isBetween(
                    moment(release.dates[release.dates.length - 1].date),
                    moment(release.dates[0].date),
                  )}
                >
                  {moment(new Date()).isBetween(
                    moment(release.dates[release.dates.length - 1].date),
                    moment(release.dates[0].date),
                  ) ? (
                    <Title>Período ativo</Title>
                  ) : (
                    <Title>Período</Title>
                  )}
                  <TimeContent>
                    <TimeText>
                      {moment(
                        release.dates[release.dates.length - 1].date,
                      ).format('L')}
                    </TimeText>
                    <Icon
                      name="long-arrow-right"
                      style={{ marginHorizontal: 10, color: '#AEAEB3' }}
                    />
                    <TimeText>
                      {moment(release.dates[0].date).format('L')}
                    </TimeText>
                  </TimeContent>
                </BottomContent>
              </Bottom>
            )}
          </Container>
        )}
      />
    </View>
  );
}
