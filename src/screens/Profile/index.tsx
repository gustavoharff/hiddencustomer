import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { Avatar, ListHeader, Logo, ChangeUserPassword } from 'components';

import { COLORS, SPACING } from 'styles';

import { Container } from './styles';

const Profile: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabRoutes = [
    { key: 'data', title: 'Dados' },
    { key: 'change-password', title: 'Trocar senha' },
  ];

  const renderScene = useCallback(({ route: tabRoute }) => {
    switch (tabRoute.key) {
      case 'data':
        return <Logo size={20} />;
      case 'change-password':
        return <ChangeUserPassword />;
      default:
        return null;
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={65}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="never">
        <Container>
          <View style={{ flex: 1, width: '100%' }}>
            <ListHeader title="Meu perfil" />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: SPACING.L,
              }}
            >
              <Avatar
                url="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                size={SPACING.XL * 8}
              />
            </View>

            <TabView
              navigationState={{ routes: tabRoutes, index: tabIndex }}
              renderScene={renderScene}
              onIndexChange={setTabIndex}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: COLORS.LIGHTEN_10 }}
                  style={{ backgroundColor: COLORS.DARKEN_5 }}
                />
              )}
            />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { Profile };
