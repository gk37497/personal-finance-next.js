import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { TransactionSection } from '@/components/TransactionSection';
import { LoginButton } from '@/components/auth/LoginButton';

export default function Home() {
  const { user, loading } = useAuth();
  return !loading ? (
    <div>{!user ? <LoginButton /> : <TransactionSection />}</div>
  ) : null;
}

Home.Layout = Layout;
