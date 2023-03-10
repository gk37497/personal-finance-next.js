import { useUI } from '@/context/UiContext';
import * as React from 'react';
import TransactionCreateView from './TransactionCreateView';

const TransactionView: React.FC = () => {
  const { modalActionType } = useUI();

  return (
    <div className="flex flex-col justify-between p-3">
      {modalActionType === 'CREATE' && <TransactionCreateView />}
    </div>
  );
};

export default TransactionView;
