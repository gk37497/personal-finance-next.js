import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useMemo, useState } from 'react';

import Form, { Option } from '../ui/Form/Form';
import { Text } from '../ui/Text';
import { CreateTransaction, FormData, Transaction } from '@/types';
import { createTransactionShema } from '@/types/validation';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UiContext';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/lib/firebase-config';

const types: Option[] = [
  { value: 'INCOME', label: 'INCOME' },
  { value: 'OUTCOME', label: 'EXPENSE' },
];

const TransactionCreateView: FC = () => {
  const { user } = useAuth();
  const { closeModal } = useUI();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: CreateTransaction) => {
    setLoading(true);
    try {
      const newTransaction: Partial<Transaction> = {
        amount: formData.amount,
        title: formData.title,
        type: formData.type,
        userId: user?.uid,
        date: formData.date,
      };
      await addDoc(collection(firestore, 'transaction'), newTransaction);
      closeModal();
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setLoading(false);
  };

  const formData = useMemo<FormData<CreateTransaction>[]>(
    () => [
      {
        label: 'Title',
        component: 'input',
        type: 'text',
        name: 'title',
      },
      {
        label: 'Amount',
        component: 'input',
        type: 'number',
        name: 'amount',
      },
      {
        label: 'Type',
        component: 'select',
        options: types,
        name: 'type',
      },
      {
        label: 'Date Time',
        component: 'input',
        type: 'datetime-local',
        name: 'date',
      },
    ],
    []
  );

  return (
    <div className="flex w-80 flex-col justify-between p-3">
      <Text variant="pageHeading">CREATE TRANSACTION</Text>
      <Form<CreateTransaction>
        onSubmit={onSubmit}
        className="max-w-xl space-y-2 md:space-y-3"
        validationSchema={yupResolver(createTransactionShema)}
        formData={formData}
        loading={loading}
      />
    </div>
  );
};

export default TransactionCreateView;
