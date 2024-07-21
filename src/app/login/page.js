"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// import {jwtDecode} from 'jwt-decode'; // jwt-decode paketini ekle zaten useAuth'da eklendi. o yüzden burada eklemiyoruz yoksa hata verir.
import { getRoleFromToken } from '../utils/auth';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Email state
  const [isRegistering, setIsRegistering] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    return password.length >= minLength && hasNumber.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      toast.error('Kullanıcı adı ve şifre boş olamaz');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        toast.error('Giriş başarısız oldu: ' + errorData.message);
        return;
      }

      const token = await response.text();
      console.log('Received data:', token); // Token'i kontrol etmek için ekrana yazdır
      localStorage.setItem('token', token); // Token'ı saklama

      
      const userRole = getRoleFromToken(token);
      console.log('User role:', userRole);
      toast.success('Başarıyla giriş yapıldı');

      if (userRole === 'ROLE_ADMIN') {
        router.push('/admin'); // Admin rolü varsa admin sayfasına yönlendir
      } else {
        router.push('/dashboard'); // Diğer roller için dashboard sayfasına yönlendir
      }

    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Yanlış kullanıcı adı veya şifre');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === '' || password === '' || email === '') {
      toast.error('Kullanıcı adı, şifre ve email boş olamaz');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Şifre en az 8 karakter uzunluğunda olmalı ve bir sayı içermelidir.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Email'i de body'ye ekle
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Register error:', errorData);
        toast.error('Kayıt başarısız oldu: ' + errorData.message);
        return;
      }

      toast.success('Başarıyla kayıt olundu');
      setIsRegistering(false); // Kayıt formunu kapat

    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Kayıt işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-white dark:from-gray-900 dark:to-black px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</h1>
      
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        {isRegistering && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required // Email alanını zorunlu hale getir
            />
          </div>
        )}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required // Kullanıcı adı alanını zorunlu hale getir
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Şifre</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required // Şifre alanını zorunlu hale getir
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
        >
          {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
        </button>
      </form>
      
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        {isRegistering ? 'Zaten hesabınız var mı? Giriş yapın' : 'Hesabınız yok mu? Kayıt olun'}
      </button>
    </div>
  );
}
