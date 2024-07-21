"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function ilanlarimPage() {
  // bu isim önemli bu isime göre link sayfayı buluyor.
  useAuth();

  const router = useRouter();
  const [ilanlar, setIlanlar] = useState([]);
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
          // Kullanıcının ilanlarını al
          axios
            .get(
              `http://localhost:8080/api/v1/ads/user/${response.data.username}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              setIlanlar(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Kullanıcının ilanlarını çekme hatası:", error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Kullanıcı bilgilerini çekme hatası:", error);
        });
    }
  }, [router]);

  const handleStatusChange = (id, status) => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8080/api/v1/ads/${id}/status`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: status,
        },
      })
      .then((response) => {
        // İlanın durumunu güncelle
        setIlanlar((prevIlanlar) =>
          prevIlanlar.map((ilan) => {
            if (ilan.id === id) {
              return { ...ilan, status: status };
            }
            return ilan;
          })
        );
      })
      .catch((error) => {
        console.error("İlan durumu güncellenemedi:", error);
      });
  };

  if (loading) {
    return <p className="text-center text-lg">Yükleniyor...</p>;
  }

  if (!ilanlar) {
    return <p className="text-center text-lg">İlan bulunamadı.</p>;
  }

  // const isInReview = ilanlar.status === "IN_REVIEW";
  // const isProductOwner = currentUser && ilanlar.productOwner === currentUser.username;


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kullanıcının İlanları</h1>
      <Link href="/ilanlarim/create-ad">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Yeni İlan Oluştur
        </button>
      </Link>
      <ul className="space-y-4">
        {ilanlar.length > 0 ? (
          ilanlar.map((ilan) => (
            <li key={ilan.id} className="p-4 border rounded shadow">
              <Link
                href={`/ilan/${ilan.id}`}
                className="text-lg font-semibold text-blue-500"
              >
                {ilan.title}
              </Link>
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
                Son Geçerlilik Tarihi:{" "}
                {new Date(ilan.expiryDate).toLocaleString()}
              </p>
              {ilan.product && (
                <div className="mt-2">
                  <p className="text-gray-700">Ürün Bilgisi:</p>
                  <p className="text-gray-500">Adı: {ilan.product.name}</p>
                  <p className="text-gray-500">
                    Açıklama: {ilan.product.description}
                  </p>
                  <p className="text-gray-500">Fiyat: ${ilan.product.price}</p>
                  <p className="text-gray-500">Stok: {ilan.product.stock}</p>
                </div>
              )}
              <div className="flex space-x-2 mt-2">
                {currentUser && ilan.productOwner === currentUser.username && (
                  <>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                      Düzenle
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Sil
                    </button>
                    <button
                      className={`px-4 py-2 rounded ${
                         ilan.status=="IN_REVIEW"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-gray-500 text-white"
                      }`}
                      onClick={() =>
                        ilan.status!=="IN_REVIEW" && handleStatusChange(ilan.id, "PASSIVE")
                      }
                      disabled={ ilan.status=="IN_REVIEW"}
                    >
                      Pasif Yap
                    </button>
                    <button
                      className={`px-4 py-2 rounded ${
                         ilan.status=="IN_REVIEW"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-500 text-white"
                      }`}
                      onClick={() =>
                        ilan.status!=="IN_REVIEW" && handleStatusChange(ilan.id, "ACTIVE")
                      }
                      disabled={ ilan.status=="IN_REVIEW"}
                    >
                      Aktif Yap
                    </button>
                  </>
                )}
                { ilan.productOwner !== currentUser.username && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Satın Al
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>Henüz ilanınız yok.</p>
        )}
      </ul>
    </div>
  );
}
