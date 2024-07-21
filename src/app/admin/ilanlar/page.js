"use client";

import AdminLayout from "../layout"; // Layout'u içe aktar
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useAuth } from "../../hooks/useAuth";

export default function ilanlarPage() {
  useAuth();

  const router = useRouter();
  const [ilanlar, setIlanlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Kullanıcı bilgilerini al
      axios.get('http://localhost:8080/api/v1/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error('Kullanıcı bilgilerini çekme hatası:', error);
        });

      // İlanları al
      axios.get('http://localhost:8080/api/v1/ads/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log('İlanlar:', response.data);
          setIlanlar(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('İlanları çekme hatası:', error);
          setLoading(false);
        });
    }
  }, [router]);

  const handleStatusChange = (id, status) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:8080/api/v1/admin/makeActive/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        status: status
      }
    })
      .then(response => {
        // İlanın durumunu güncelle
        setIlanlar(prevIlanlar => prevIlanlar.map(ilan => {
          if (ilan.id === id) {
            return { ...ilan, status: status };
          }
          return ilan;
        }));
      })
      .catch(error => {
        console.error('İlan durumu güncellenemedi:', error);
      });
  };

  if (loading) {
    return <p className="text-center text-lg">Yükleniyor...</p>;
  }

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">İlanlar</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Yeni İlan Oluştur</button>
        <ul className="space-y-4">
          {ilanlar.map((ilan) => (
            <li key={ilan.id} className="p-4 border rounded shadow">
              <Link href={`/admin/ilan/${ilan.id}`} className="text-lg font-semibold text-blue-500">{ilan.title}</Link>
              <p className="text-gray-700">Ürün Sahibi: {ilan.productOwner}</p>
              <p className="text-gray-700">{ilan.description}</p>
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
                <>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded">Düzenle</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded">Sil</button>
                  {ilan.status === 'IN_REVIEW' && (
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleStatusChange(ilan.id, 'ACTIVE')}
                    >
                      Aktif Yap
                    </button>
                  )}
                  {ilan.status === 'ACTIVE' && (
                    <button 
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => handleStatusChange(ilan.id, 'PASSIVE')}
                    >
                      Pasif Yap
                    </button>
                  )}
                  {ilan.status === 'PASSIVE' && (
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleStatusChange(ilan.id, 'ACTIVE')}
                    >
                      Aktif Yap
                    </button>
                  )}
                </>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
