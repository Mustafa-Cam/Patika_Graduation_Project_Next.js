"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  FaUser,
  FaSignOutAlt,
  FaThLarge,
  FaBoxes,
  FaClipboardList,
} from "react-icons/fa";
import Modal from "./Modal"; // Modal bileşenini içe aktar

const Navbar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null); // Kullanıcı bilgilerini sıfırla
    setIsUserDataLoaded(false); // Kullanıcı verilerini tekrar yükle
    router.push("/login");
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setIsUserDataLoaded(true);
      console.log("Fetched user data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleModal = async () => {
    if (!isUserDataLoaded && localStorage.getItem("token")) {
      await fetchUserData();
    }
    setIsModalVisible((prev) => !prev);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <ul className="flex items-center w-full max-w-8xl mx-auto">
        <div className="flex space-x-6">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center text-white text-lg hover:text-gray-300 transition-colors duration-200"
            >
              <FaThLarge className="mr-1 text-xl" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/paketler"
              className="flex items-center text-white text-lg hover:text-gray-300 transition-colors duration-200"
            >
              <FaBoxes className="mr-1 text-xl" />
              Paketler
            </Link>
          </li>
          <li>
            <Link
              href="/ilanlarim"
              className="flex items-center text-white text-lg hover:text-gray-300 transition-colors duration-200"
            >
              <FaClipboardList className="mr-1 text-xl" />
              ilanlarım
            </Link>
          </li>
        </div>
        <div className="ml-auto flex space-x-6">
          <li>
            <button
              onClick={toggleModal}
              className="flex items-center text-white text-lg hover:text-gray-300 transition-colors duration-200"
            >
              <FaUser className="mr-1 text-xl" />
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-white text-lg hover:text-gray-300 transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-1 text-xl" />
              Logout
            </button>
          </li>
        </div>
      </ul>

      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        {userData ? (
          <div className="text-black text-center">
            <p className="text-lg">
              <strong>Kullanıcı Adı:</strong> {userData.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        ) : (
          <p className="text-base">Yükleniyor...</p>
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
