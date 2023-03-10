import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormData, LoginValues } from '@/types';
import { Form } from '@/components/ui/Form';
import { loginShema } from '@/types/validation';
import { Text } from '@/components/ui/Text';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UiContext';

const LoginView = () => {
  const r = useRouter();
  const { user, login } = useAuth();
  const { closeModal, setModalView } = useUI();

  const onSubmit = async (formData: LoginValues) => {
    try {
      await login(formData.email, formData.password);
      closeModal();
    } catch (err) {
      console.info(err);
    }
  };

  const handleRegisterButton = () => setModalView('SIGNUP_VIEW');

  const formData = React.useMemo<FormData<LoginValues>[]>(
    () => [
      {
        label: 'Email',
        component: 'input',
        name: 'email',
        autoComplete: 'email',
      },
      {
        label: 'Password',
        component: 'input',
        name: 'password',
        autoComplete: 'current-password',
        type: 'password',
      },
    ],
    []
  );

  return (
    <div className="flex flex-col items-center justify-center shadow-md p-5 space-y-8">
      <Text variant="pageHeading">Login</Text>
      <Form<LoginValues>
        onSubmit={onSubmit}
        className="w-full space-y-2 md:space-y-3"
        validationSchema={yupResolver(loginShema)}
        formData={formData}
        initialValue={{ ...user }}
        saveButtonTitle="Login"
      />
      <div className="w-full space-y-3">
        <div className="h-[1px] bg-accent-7 w-full" />
        <p className="m-0 p-0 text-xs text-center">Not have account</p>
        <Button
          variant="slim"
          className="w-full"
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
