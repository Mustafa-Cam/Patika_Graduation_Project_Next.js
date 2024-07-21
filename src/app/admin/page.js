import React from "react";
import AdminLayout from "./layout"; // Layout'u içe aktar

const AdminPage = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Admin Paneli</h1>
        <p>Admin paneline hoş geldiniz!</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
