// import React from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './globals.css';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="tr">
//       <body>
//         <Navbar />
//         <main>{children}</main>
//         <Footer />
//         <ToastContainer />
//       </body>
//     </html>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/Footer';
import './globals.css';
import { getRoleFromToken } from './utils/auth';

export default function RootLayout({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = getRoleFromToken(token);
      setUserRole(role);
      console.log("layout: " + role);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Burada bir yükleme göstergesi veya boş içerik gösterilebilir
  }

  return (
    <html lang="tr">
      <body>
        {/* <Navbar /> */}
        {(userRole === 'ROLE_ADMIN') ? <AdminNavbar /> : <Navbar />}
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
