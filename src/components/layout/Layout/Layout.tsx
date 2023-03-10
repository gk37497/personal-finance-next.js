import cn from 'clsx';
import Head from 'next/head';
import React from 'react';
import s from './Layout.module.css';
import { Modal } from '@/components/ui/Modal';
import { useUI } from '@/context/UiContext';
import { LoginView } from '@/components/auth/LoginView';
import { SignupView } from '@/components/auth/SignupView';
import TransactionView from '@/components/transaction/TransactionView';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LogoutButton } from '@/components/auth/LogoutButton';

export interface Props {
  pageProps: {
    pages?: [];
  };
  children?: React.ReactNode;
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignupView />}
      {modalView === 'TRANSACTION_VIEW' && <TransactionView />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cn(s.root)}>
      <Head>
        <title>Personal ▮ Finance</title>
      </Head>
      <main className="px-5 md:max-w-screen-sm mx-auto min-h-screen pt-10">
        <div className="flex gap-3 justify-end">
          <LogoutButton />
          <ThemeSwitcher />
        </div>
        {children}
      </main>
      <ModalUI />
    </div>
  );
};

export default Layout;
