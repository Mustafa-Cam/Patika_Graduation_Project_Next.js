// "use client";

// import { createContext, useContext, useState, useEffect } from 'react';
// import { getRoleFromToken } from '../utils/auth';

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     // Burada kullanıcı bilgilerini API'den veya localStorage'dan alın.
//     // Bu örnekte, admin kullanıcı simüle ediliyor.
//     const userRole = getRoleFromToken(localStorage.getItem('token')); // veya başka bir yöntemle kullanıcı rolünü alın
//     setUserRole(userRole);
//     console.log("Context: " + userRole);
//   }, []);

//   return (
//     <UserContext.Provider value={userRole}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }
