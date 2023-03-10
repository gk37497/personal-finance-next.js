import { Option } from '@/components/ui/Form/Form';
import { Timestamp } from 'firebase/firestore';
import { HTMLInputTypeAttribute } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { Options } from 'react-select';

export interface FormData<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  component: 'input' | 'select';
  type?: HTMLInputTypeAttribute;
  name: FieldPath<TFieldValues>;
  options?: Options<Option>;
}

export type LoginValues = {
  email: string;
  password: string;
};

export type CreateCategory = {
  name: string;
};

export type CreateTransaction = {
  title: Transaction['title'];
  amount: Transaction['amount'];
  type: Transaction['type'];
  date: Timestamp;
};

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  userId: string;
  date: Timestamp;
  type: 'INCOME' | 'OUTCOME';
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdDate: Timestamp;
}
