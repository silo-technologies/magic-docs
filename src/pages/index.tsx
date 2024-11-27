import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/stage-api');
  }, [router]);
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">Redirecting...</p>
    </div>
  );
};

export default Home;
