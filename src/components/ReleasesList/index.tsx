import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import produce from 'immer';
import moment from 'moment';
import 'moment/locale/pt-br';

import { EmptyList, DeleteItem } from 'components';

import { api, getRealm } from 'services';

import { Release } from 'types';

import { Container, Name, Description, DescriptionText } from './styles';

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
            tintColor="rgba(255,255,255,0.75)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={releases}
        renderItem={({ item: release, index }) => (
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
                });
              }}
            >
              <Container>
                <Name>{release.name}</Name>
                <Description>
                  <DescriptionText>
                    {release.paid
                      ? 'Pagamento realizado!'
                      : 'Pagamento ainda não realizado!'}
                  </DescriptionText>
                </Description>
                <Description>
                  <DescriptionText>
                    Atualizado{' '}
                    {moment(release.updated_at)
                      .utc(true)
                      .locale('pt-br')
                      .fromNow()}
                  </DescriptionText>
                  <DescriptionText />
                </Description>
              </Container>
            </RectButton>
          </Swipeable>
        )}
      />
    </View>
  );
};

export { ReleasesList };
