import { Transaction } from '@/types';
import React, { useState } from 'react';
import { Button } from './ui/Button';
import useFirestore from '@/lib/hooks/useFirebase';
import { Text } from './ui/Text';
import { useUI } from '@/context/UiContext';
import { TransactionItem } from './transaction/TransactionItem';

export const TransactionSection = () => {
  const { openModal, setModalView } = useUI();
  const { data } = useFirestore<Transaction>('transaction');

  const [showIncomes, setShowIncomes] = useState<boolean>(true);

  const addTransaction = () => {
    setModalView('TRANSACTION_VIEW');
    openModal();
  };

  const balance = (): number => {
    return data.reduce(
      (temp, e) => temp + (e.type === 'INCOME' ? e.amount : -e.amount),
      0
    );
  };

  const renderTransactionItems = (transactions: Transaction[]) => {
    return transactions.map((transaction) => {
      if (
        (showIncomes && transaction.type === 'OUTCOME') ||
        (!showIncomes && transaction.type === 'INCOME')
      ) {
        return null;
      }
      return <TransactionItem transaction={transaction} key={transaction.id} />;
    });
  };

  return (
    <div className="my-5 space-y-5">
      <div className="flex flex-col items-center justify-center border-y py-5 border-accent-8">
        <Text variant="heading">{balance()}</Text>
        <Text className="-mt-4">total balance</Text>
      </div>
      <div className="flex h-10 gap-3 justify-between">
        <Button
          variant={showIncomes ? 'flat' : 'ghost'}
          onClick={() => setShowIncomes(true)}
          className="w-full"
        >
          INCOME
        </Button>
        <Button
          variant={!showIncomes ? 'flat' : 'ghost'}
          onClick={() => setShowIncomes(false)}
          className="w-full"
        >
          EXPENSE
        </Button>
      </div>
      <div className="min-h-[30vh]">{renderTransactionItems(data)}</div>
      <div className="w-full flex">
        <Button onClick={addTransaction} className="w-full">
          Add Transaction
        </Button>
      </div>
    </div>
  );
};
