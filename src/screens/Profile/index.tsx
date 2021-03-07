import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { Avatar, ChangeUserPassword, ChangeUserInfo } from 'components';

import { SPACING } from 'styles';

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
        return <ChangeUserInfo />;
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
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: SPACING.L,
                backgroundColor: '#47474d',
              }}
            >
              <Avatar
                url="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                size={SPACING.XL * 6}
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
                  indicatorStyle={{ backgroundColor: '#DC1637' }}
                  activeColor="#fff"
                  inactiveColor="#f3f3f3"
                  style={{ backgroundColor: '#AEAEB3' }}
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
