import { View, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING } from 'styles';

interface HeaderIconProps extends ViewProps {
  name: string;
  onPress: () => void;
}

export function HeaderIcon({
  name,
  onPress,
  ...rest
}: HeaderIconProps): JSX.Element {
  return (
    <View {...rest}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={name} color="#DC1637" size={SPACING.L * 2} />
      </TouchableOpacity>
    </View>
  );
}
