import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      router.push('/account');
    }
  }, [data, router]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen p-10 space-y-10 dark:bg-black">
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      {children}
    </main>
  );
};

export default AuthLayout;
