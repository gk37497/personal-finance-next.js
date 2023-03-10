import React from 'react';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { useUI } from '@/context/UiContext';

export const LoginButton = () => {
  const { openModal, setModalView } = useUI();

  const handleStartButton = () => {
    setModalView('LOGIN_VIEW');
    openModal();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8 mt-16">
      <Text variant="heading">Welcome.</Text>
      <Button onClick={handleStartButton} className="w-1/2">
        Login
      </Button>
    </div>
  );
};
