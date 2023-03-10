import { firestore } from '@/lib/firebase-config';
import { Transaction } from '@/types';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionProps> = ({
  transaction,
}) => {
  const { title, amount, type, id } = transaction;

  const deleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(collection(firestore, 'transaction'), id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={clsx(
        'flex px-3 py-2 rounded-md my-3 w-full justify-between items-center',
        type === 'OUTCOME' ? 'bg-primary-2' : 'bg-secondary-2'
      )}
    >
      <div>
        <h3>{title}</h3>
        <p>
          {type === 'INCOME' ? '+' : '-'}
          {amount} ₮
        </p>
        <Text variant="small">{JSON.stringify(transaction.date)}</Text>
      </div>
      <Button
        onClick={() => deleteTransaction(id)}
        variant="slim"
        className="ml-2"
      >
        D
      </Button>
    </div>
  );
};
