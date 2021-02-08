import React from 'react';
import Plus from '../Icons/Plus';

import { Container, Button } from './styles';

const BottomButton: React.FC = () => (
  <Container>
    <Button>
      <Plus />
    </Button>
  </Container>
);

export default BottomButton;
