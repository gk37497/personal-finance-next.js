import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Button } from '../ui/Button';

export function LogoutButton() {
  const { logout, user, login } = useAuth();
  return user ? (
    <Button variant="slim" onClick={async () => await logout()}>
      sign out
    </Button>
  ) : null;
}
