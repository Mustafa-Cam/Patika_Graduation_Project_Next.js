"use client";
import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import AdminNavbar from "../components/AdminNavbar"; // Admin paneli için özel bir navbar olabilir
import Footer from "../components/Footer"; // Admin paneli için ortak bir footer

const AdminLayout = ({ children }) => {
  return (
        <PrivateRoute>
      <>
      {children} 
      </>
        </PrivateRoute>
  );
};

export default AdminLayout;
