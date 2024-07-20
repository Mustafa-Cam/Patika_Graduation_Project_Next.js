// utils/auth.js

export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp;
  
    if (!exp) return true;
  
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  };
  