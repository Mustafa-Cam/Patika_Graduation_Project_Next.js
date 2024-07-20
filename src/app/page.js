'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-white dark:from-gray-900 dark:to-black">
      <h1 className="text-4xl font-bold mb-8 text-center">Emlak Uygulamasına Hoşgeldiniz</h1>
      <nav>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link href="/login" className="text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300">
              Giriş Yap
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300">
              İlanlar
            </Link>
          </li>
          <li>
            <Link href="/paketler" className="text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300">
              Paketler
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
