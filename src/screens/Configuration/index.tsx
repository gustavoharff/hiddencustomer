import { Alert, FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from 'hooks';

import { Container, Content } from './styles';

export function Configuration() {
  const { signOut } = useAuth();

  const navigation = useNavigation();

  const data = [
    {
      option: 'Alterar nome / email',
      onPress: () => {
        navigation.navigate('ChangeUserInfo');
      },
    },
    {
      option: 'Alterar senha',
      onPress: () => {
        navigation.navigate('ChangeUserPassword');
      },
    },
    {
      option: 'Sair do app',
      onPress: () => {
        Alert.alert('Atenção', 'Deseja mesmo sair do aplicativo?', [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              signOut();
            },
          },
        ]);
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item} - ${index}`}
        renderItem={({ item, index }) => {
          return (
            <Container style={{ paddingTop: index !== 0 ? 0 : 16 }}>
              <TouchableOpacity disabled={!item.onPress} onPress={item.onPress}>
                <Content>
                  <Text>{item.option}</Text>
                </Content>
              </TouchableOpacity>
            </Container>
          );
        }}
      />
    </View>
  );
}
