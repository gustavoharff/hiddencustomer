import React from 'react';
import Button from '../../components/Button';

import ListHeader from '../../components/ListHeader';

import { useAuth } from '../../hooks/auth';
import { SPACING } from '../../styles/tokens';

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

export default Profile;
