import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormData, LoginValues } from '@/types';
import { Form } from '@/components/ui/Form';
import { loginShema } from '@/types/validation';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UiContext';
import { Button } from '@/components/ui/Button';

const SignupView = () => {
  const { user, signup } = useAuth();
  const { closeModal, setModalView } = useUI();

  const onSubmit = async (formData: LoginValues) => {
    try {
      await signup(formData.email, formData.password);
      closeModal();
    } catch (err) {
      console.info(err);
    }
  };

  const handleLoginButton = () => setModalView('LOGIN_VIEW');

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
    <div className="flex items-center justify-center mx-auto flex-col">
      <Text variant="pageHeading">Sign Up</Text>
      <Form<LoginValues>
        onSubmit={onSubmit}
        className="w-full space-y-2 md:space-y-3 shadow-md p-5"
        validationSchema={yupResolver(loginShema)}
        formData={formData}
        saveButtonTitle="Signup"
      />
      <div className="w-full space-y-3">
        <div className="h-[1px] bg-accent-7 w-full" />
        <p className="m-0 p-0 text-xs text-center">Already have account</p>
        <Button variant="slim" className="w-full" onClick={handleLoginButton}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignupView;
