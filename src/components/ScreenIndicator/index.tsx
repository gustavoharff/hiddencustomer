import React from 'react';
import { ViewProps } from 'react-native';

import { Container } from './styles';

type Props = ViewProps;

const ScreenIndicator: React.FC<Props> = props => <Container {...props} />;

export { ScreenIndicator };
