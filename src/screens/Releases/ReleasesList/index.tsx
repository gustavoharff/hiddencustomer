import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { EmptyList, DeleteItem, EditItem } from 'components';

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

type ReleasesListProps = {
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const ReleasesList: React.FC<ReleasesListProps> = ({
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<Swipeable | null>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();

  const { releases, deleteRelease } = useReleases();

  const navigation = useNavigation();

  const onDeleteItem = useCallback(
    (releaseId: string) => {
      Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
        {
          text: 'Cancelar',
          onPress: () => prevOpenedRow.close(),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => deleteRelease(releaseId) },
      ]);
    },
    [prevOpenedRow, deleteRelease],
  );

  const closeRow = useCallback(
    index => {
      setPrevOpenedRow(row[index]);
    },
    [row],
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
                ref={ref => {
                  row[index] = ref;
                }}
                friction={1.5}
                rightThreshold={30}
                renderRightActions={() => (
                  <>
                    <DeleteItem
                      onPress={() => {
                        onDeleteItem(release.id);
                      }}
                    />
                    <EditItem
                      onPress={() => {
                        prevOpenedRow?.close();
                        navigation.navigate('ReleaseChange', {
                          release_id: release.id,
                        });
                      }}
                    />
                  </>
                )}
                activeOffsetX={-1}
                activeOffsetY={500}
                onSwipeableOpen={() => closeRow(index)}
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
                        <Description>{release.dates_counter}</Description>
                      </Item>
                      <Item>
                        <Title>Grupos</Title>
                        <Description>{release.groups_counter}</Description>
                      </Item>
                    </View>
                  </Content>
                </RectButton>
              </Swipeable>
            </Top>
            {release.interval && release.interval.length > 0 && (
              <Bottom>
                <BottomContent
                  between={moment(new Date()).isBetween(
                    moment(release.interval[0]),
                    moment(release.interval[1]),
                  )}
                >
                  {moment(new Date()).isBetween(
                    moment(release.interval[0]),
                    moment(release.interval[1]),
                  ) ? (
                    <Title>Período ativo</Title>
                  ) : (
                    <Title>Período</Title>
                  )}
                  <TimeContent>
                    <TimeText>
                      {moment(release.interval[0]).format('L')}
                    </TimeText>
                    <Icon
                      name="long-arrow-right"
                      style={{ marginHorizontal: 10, color: '#AEAEB3' }}
                    />
                    <TimeText>
                      {moment(release.interval[1]).format('L')}
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
};

export { ReleasesList };