"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { getRoleFromToken } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const role = getRoleFromToken(token);

  if (role !== 'ROLE_ADMIN') {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
