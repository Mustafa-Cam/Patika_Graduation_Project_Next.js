'use client';

import React from 'react';
import { useAuth } from '../hooks/useAuth';


export default function ProfilePage() {
    useAuth();
  return (
    <div>
      <Profile />
    </div>
  );
}
