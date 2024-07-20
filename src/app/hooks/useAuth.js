// hooks/useAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '../utils/auth';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);
};
