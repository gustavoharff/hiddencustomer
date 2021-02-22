import React from 'react';

import { Button, ListHeader } from 'components';

import { useAuth } from 'hooks';

import { SPACING } from 'styles';

import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <Container>
        <ListHeader title="Meu perfil" />
        <Button
          title="Sair"
          onPress={signOut}
          style={{ marginBottom: SPACING.XL }}
        />
      </Container>
    </>
  );
};

export { Profile };
