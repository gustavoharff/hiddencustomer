import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { EmptyList, Swipeable } from 'components';

import moment from 'moment';
import { useReleases } from 'hooks';
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
  onRefresh: () => Promise<void>;
  emptyListText: string;
}

export function ReleasesList({
  onRefresh,
  emptyListText,
}: ReleasesListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const {
    releases,
    releasesDates,
    deleteRelease,
    releasesGroups,
  } = useReleases();

  const navigation = useNavigation();

  const onDeleteItem = useCallback(
    async (releaseId: string) => {
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
              await deleteRelease(releaseId);
              return resolve(200);
            },
          },
        ]);
      });
    },
    [deleteRelease],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text={emptyListText} />}
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
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Top>
              <Swipeable
                editOption
                editOnPress={() =>
                  navigation.navigate('ReleaseChange', {
                    release_id: release.id,
                  })
                }
                deleteOption
                deleteOnPress={async () => {
                  await onDeleteItem(release.id);
                }}
              >
                <RectButton
                  onPress={() => {
                    navigation.navigate('ReleaseDetails', {
                      release_id: release.id,
                      customer_id: release.customer_id,
                    });
                  }}
                >
                  <Content>
                    <View>
                      {release.customer?.name && (
                        <Title>{release.customer.name}</Title>
                      )}
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
                        <Description>
                          {
                            releasesDates.filter(
                              date => date.release_id === release.id,
                            ).length
                          }
                        </Description>
                      </Item>
                      <Item>
                        <Title>Grupos</Title>
                        <Description>
                          {
                            releasesGroups.filter(
                              group => group.release_id === release.id,
                            ).length
                          }
                        </Description>
                      </Item>
                    </View>
                  </Content>
                </RectButton>
              </Swipeable>
            </Top>
            {releasesDates.filter(
              releaseDate => releaseDate.release_id === release.id,
            ).length >= 1 && (
              <Bottom>
                <BottomContent
                  between={moment(new Date()).isBetween(
                    moment(
                      releasesDates.filter(
                        releaseDate => releaseDate.release_id === release.id,
                      )[
                        releasesDates.filter(
                          releaseDate => releaseDate.release_id === release.id,
                        ).length - 1
                      ].date,
                    ),
                    moment(
                      releasesDates.filter(
                        releaseDate => releaseDate.release_id === release.id,
                      )[0].date,
                    ),
                  )}
                >
                  {moment(new Date()).isBetween(
                    moment(
                      releasesDates.filter(
                        releaseDate => releaseDate.release_id === release.id,
                      )[
                        releasesDates.filter(
                          releaseDate => releaseDate.release_id === release.id,
                        ).length - 1
                      ].date,
                    ),
                    moment(
                      releasesDates.filter(
                        releaseDate => releaseDate.release_id === release.id,
                      )[0].date,
                    ),
                  ) ? (
                    <Title>Período ativo</Title>
                  ) : (
                    <Title>Período</Title>
                  )}
                  <TimeContent>
                    <TimeText>
                      {moment(
                        releasesDates.filter(
                          releaseDate => releaseDate.release_id === release.id,
                        )[
                          releasesDates.filter(
                            releaseDate =>
                              releaseDate.release_id === release.id,
                          ).length - 1
                        ].date,
                      ).format('L')}
                    </TimeText>
                    <Icon
                      name="long-arrow-right"
                      style={{ marginHorizontal: 10, color: '#AEAEB3' }}
                    />
                    <TimeText>
                      {moment(
                        releasesDates.filter(
                          releaseDate => releaseDate.release_id === release.id,
                        )[0]?.date,
                      ).format('L')}
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
