// import React, { useState, useEffect } from 'react';
// import RootLayout from './RootLayout'; // RootLayout bileşenini import edin
// import { getRoleFromToken } from './utils/auth';

// function App() {
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Kullanıcının admin olup olmadığını kontrol edin (örneğin, localStorage veya API çağrısı ile)
//     const userRole = getRoleFromToken(localStorage.getItem('token')); // veya başka bir yöntemle kullanıcı rolünü alın
//     setIsAdmin(userRole === 'ROLE_ADMIN');
//   }, []);

//   return (
//     <RootLayout isAdmin={isAdmin}>
//       {/* Diğer bileşenler */}
//     </RootLayout>
//   );
// }

// export default App;
