import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Title, Content } from './styles';

interface DrawerItemProps {
  onPress(): void;
  title: string;
  Icon: React.FC<{}>;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ title, onPress, Icon }) => {
  console.log();

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Icon />
        <Content>
          <Title>{title}</Title>
        </Content>
      </Container>
    </TouchableOpacity>
  );
};

export default DrawerItem;
