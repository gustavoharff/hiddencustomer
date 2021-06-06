import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Avatar, EmptyList, Swipeable } from 'components';

import { COLORS, SPACING } from 'styles';

import { UsersContext } from 'hooks/users';

import { Container, Name, Email, UserInfo, Content } from './styles';

export function UsersList(): JSX.Element {
  const navigation = useNavigation();

  const { users, refresh } = useContext(UsersContext);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    await refresh();

    setRefreshing(false);
  }, [refresh]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={<EmptyList text="Nenhum usuário cadastrado." />}
        refreshControl={
          <RefreshControl
            tintColor="rgba(0,0,0,0.5)"
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#DC1637']}
          />
        }
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={users}
        renderItem={({ item: user, index }) => (
          <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
            <Swipeable
              editOption
              editOnPress={() => {
                navigation.navigate('AdministrationStack', {
                  screen: 'UserForm',
                  params: {
                    user,
                  },
                });
              }}
            >
              <Content>
                <Avatar
                  size={SPACING.M * 5}
                  url={
                    user.avatar_url ||
                    'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                  }
                />
                <UserInfo>
                  <Name>{user.name}</Name>
                  <Email numberOfLines={1}>{user.email}</Email>
                  <Email numberOfLines={1}>{user.company?.name}</Email>
                </UserInfo>
                <Icon
                  name={user.active ? 'check' : 'close'}
                  color={user.active ? COLORS.SUCCESS : COLORS.ALERT}
                  size={SPACING.L * 1.5}
                  style={{ marginRight: SPACING.S }}
                />
              </Content>
            </Swipeable>
          </Container>
        )}
      />
    </View>
  );
}
