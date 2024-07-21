"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function IlanDetailPage() {
  useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const ilanId = pathname.split("/").pop();
  const [ilan, setIlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      // Kullanıcı bilgilerini al
      axios
        .get("http://localhost:8080/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.error("Kullanıcı bilgilerini çekme hatası:", error);
        });

      // İlan detaylarını al
      axios
        .get(`http://localhost:8080/api/v1/ads/adDetail/${ilanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIlan(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("İlan detaylarını çekme hatası:", error);
          setLoading(false);
        });
    }
  }, [router, ilanId]);

  const handleStatusChange = (id, status) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:8080/api/v1/ads/${id}/status`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        status: status
      }
    })
    .then((response) => {
      // İlanın durumunu güncelle
      setIlan((prevIlan) => {
        if (prevIlan.id === id) {
          return { ...prevIlan, status: status };
        }
        return prevIlan;
      });
    })
      .catch(error => {
        console.error('İlan durumu güncellenemedi:', error);
      });
  };

  if (loading) {
    return <p className="text-center text-lg">Yükleniyor...</p>;
  }

  if (!ilan) {
    return <p className="text-center text-lg">İlan bulunamadı.</p>;
  }

  const isInReview = ilan.status === "IN_REVIEW";
  const isProductOwner = currentUser && ilan.productOwner === currentUser.username;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{ilan.title}</h1>
      <p className="text-gray-700">Ürün Sahibi: {ilan.productOwner}</p>
      <p className="text-gray-700">{ilan.description}</p>
      <p className="text-gray-500">Durum: {ilan.status}</p>
      <p className="text-gray-500">
        Oluşturulma Tarihi: {new Date(ilan.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Güncellenme Tarihi: {new Date(ilan.updatedAt).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Son Geçerlilik Tarihi: {new Date(ilan.expiryDate).toLocaleString()}
      </p>
      {ilan.product && (
        <div className="mt-2">
          <p className="text-gray-700">Ürün Bilgisi:</p>
          <p className="text-gray-500">Adı: {ilan.product.name}</p>
          <p className="text-gray-500">Açıklama: {ilan.product.description}</p>
          <p className="text-gray-500">Fiyat: ${ilan.product.price}</p>
          <p className="text-gray-500">Stok: {ilan.product.stock}</p>
        </div>
      )}
      <div className="flex space-x-2 mt-2">
        {isProductOwner && (
          <>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Düzenle
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Sil
            </button>
            <button
              className={`px-4 py-2 rounded ${isInReview ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-500 text-white'}`}
              onClick={() => !isInReview && handleStatusChange(ilan.id, "PASSIVE")}
              disabled={isInReview}
            >
              Pasif Yap
            </button>
            <button
              className={`px-4 py-2 rounded ${isInReview ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white'}`}
              onClick={() => !isInReview && handleStatusChange(ilan.id, "ACTIVE")}
              disabled={isInReview}
            >
              Aktif Yap
            </button>
          </>
        )}
        {!isProductOwner && (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Satın Al
          </button>
        )}
      </div>
    </div>
  );
}
