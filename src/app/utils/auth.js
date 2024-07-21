// utils/auth.js

import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp;
  
    if (!exp) return true;
  
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  };

  export const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.role; // Token'da rol bilgisi 'role' altında saklanıyor
    } catch (error) {
      console.error('Token decoding error:', error);
      return null;
    }
  };
  