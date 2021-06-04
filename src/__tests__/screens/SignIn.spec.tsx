import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { SignIn } from '../../components/screens/Authentication/SignIn';

const mockedSignIn = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

const alert = jest.spyOn(Alert, 'alert');

describe('SignIn screen', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
    alert.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInputElement = getByPlaceholderText('E-mail');
    const passwordInputElement = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailInputElement, 'example@email.com');

    fireEvent.changeText(passwordInputElement, '1234567');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith({
        email: 'example@email.com',
        password: '1234567',
      });
    });
  });

  it('should not be able to sign in whith invalid email format', async () => {
    const { getByPlaceholderText } = render(<SignIn />);

    const emailInputElement = getByPlaceholderText('E-mail');
    const passwordInputElement = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInputElement, 'example');

    fireEvent(emailInputElement, 'onSubmitEditing');

    fireEvent.changeText(passwordInputElement, '1234567');

    fireEvent(passwordInputElement, 'onSubmitEditing');

    jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Alerta',
        'Complete os campos corretamente.',
      );
    });
  });

  it('should not be able to sign in whith no permission', async () => {
    mockedSignIn.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return reject({ response: { status: 401 } }); // eslint-disable-line
      });
    });

    const { getByPlaceholderText } = render(<SignIn />);

    const emailInputElement = getByPlaceholderText('E-mail');
    const passwordInputElement = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInputElement, 'user@email.com');

    fireEvent(emailInputElement, 'onSubmitEditing');

    fireEvent.changeText(passwordInputElement, '1234567');

    fireEvent(passwordInputElement, 'onSubmitEditing');

    jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro',
        'Usuário sem permissão de acesso ao sistema.',
      );
    });
  });

  it('should not be able to sign in whith invalid credentials', async () => {
    mockedSignIn.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return reject({ response: { status: 400 } }); // eslint-disable-line
      });
    });

    const { getByPlaceholderText } = render(<SignIn />);

    const emailInputElement = getByPlaceholderText('E-mail');
    const passwordInputElement = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInputElement, 'user@email.com');

    fireEvent(emailInputElement, 'onSubmitEditing');

    fireEvent.changeText(passwordInputElement, '1234567');

    fireEvent(passwordInputElement, 'onSubmitEditing');

    jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro',
        'Erro na autenticação, verifique seus dados.',
      );
    });
  });

  it('should not be able to sign in whith internal error', async () => {
    mockedSignIn.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return reject({ response: { status: 500 } }); // eslint-disable-line
      });
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInputElement = getByPlaceholderText('E-mail');
    const passwordInputElement = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailInputElement, 'user@email.com');

    fireEvent(emailInputElement, 'onSubmitEditing');

    fireEvent.changeText(passwordInputElement, '1234567');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro',
        'Ocoreu um erro durante a tentativa de acesso ao sistema.',
      );
    });
  });
});
