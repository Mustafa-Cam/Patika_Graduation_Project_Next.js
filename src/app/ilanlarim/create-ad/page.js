"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/hooks/useAuth";

export default function createAdPage() {
  useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");

  const handleProductIdChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setProductId("");
      return;
    }

    const numericValue = parseInt(value, 10);
    if (numericValue >= 1 && numericValue <= 50) {
      setProductId(numericValue);
    } else {
      toast.error("Ürün ID 1 ile 50 arasında olmalıdır.");
      setProductId(""); // or you can keep the last valid state if you prefer
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const adData = {
      title,
      description,
      // product: {
      //   name: productName,
      //   description: productDescription,
      //   price: parseFloat(productPrice),
      //   stock: parseInt(productStock),
      // },
    };

    try {
      await axios.post(
       `http://localhost:8080/api/v1/ads/${productId}`,
        adData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/ilanlarim");
    } catch (error) {
      console.error("İlan oluşturma hatası:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Yeni İlan Oluştur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white-700">Başlık:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full text-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-white-700">Açıklama:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full text-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-black-700">Ürün ID:</label>
          <input
            type="number"
            value={productId}
            onChange={handleProductIdChange}
            min="1"
            max="50"
            className="border rounded p-2 w-full text-red-500"
            required
          />
        </div>
        {/* <div>
          <label className="block text-gray-700">Son Geçerlilik Tarihi:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div> 
        <div>
          <label className="block text-gray-700">Ürün Adı:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ürün Açıklaması:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div> 
         <div>
          <label className="block text-gray-700">Ürün Fiyatı:</label>
          <input
            type="number"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ürün Stok Miktarı:</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div> */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          İlanı Oluştur
        </button>
      </form>
    </div>
  );
}
