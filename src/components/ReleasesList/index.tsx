import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import produce from 'immer';

import { EmptyList, DeleteItem } from 'components';

import { api, getRealm } from 'services';

import { Release } from 'types';

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
  releases: Release[];
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
  onRefresh: () => Promise<void>;
  emptyListText: string;
};

const ReleasesList: React.FC<ReleasesListProps> = ({
  releases,
  setReleases,
  onRefresh,
  emptyListText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [row] = useState<Array<any>>([]);
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>();
  const [selectedRelease, setSelectedRelease] = useState<Release>(
    {} as Release,
  );

  const navigation = useNavigation();

  const handleDelete = useCallback(async () => {
    await api.delete(`/releases/${selectedRelease.id}`);
    setReleases(
      produce(releases, drafts =>
        drafts.filter(draft => draft.id !== selectedRelease.id),
      ),
    );

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Release', selectedRelease.id));
    });
  }, [setReleases, releases, selectedRelease]);

  const onDeleteItem = useCallback(() => {
    Alert.alert('Atenção!', 'Deseja mesmo deletar este item?', [
      {
        text: 'Cancelar',
        onPress: () => prevOpenedRow.close(),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => handleDelete() },
    ]);
  }, [prevOpenedRow, handleDelete]);

  const closeRow = useCallback(
    index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      setPrevOpenedRow(row[index]);
    },
    [prevOpenedRow, row],
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
              ref={ref => (row[index] = ref)} // eslint-disable-line
                friction={1.5}
                rightThreshold={30}
                renderRightActions={() => <DeleteItem onPress={onDeleteItem} />}
                activeOffsetX={-1}
                activeOffsetY={500}
                onSwipeableOpen={() => {
                  closeRow(index);
                  setSelectedRelease(release);
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
                        <Description>5</Description>
                      </Item>
                      <Item>
                        <Title>Grupos</Title>
                        <Description>5</Description>
                      </Item>
                    </View>
                  </Content>
                </RectButton>
              </Swipeable>
            </Top>
            <Bottom>
              <BottomContent>
                <Title>Período</Title>
                <TimeContent>
                  <TimeText>18 Junho 2019</TimeText>
                  <Icon
                    name="long-arrow-right"
                    style={{ marginHorizontal: 10, color: '#AEAEB3' }}
                  />
                  <TimeText>20 Junho 2019</TimeText>
                </TimeContent>
              </BottomContent>
            </Bottom>
          </Container>
        )}
      />
    </View>
  );
};

export { ReleasesList };
