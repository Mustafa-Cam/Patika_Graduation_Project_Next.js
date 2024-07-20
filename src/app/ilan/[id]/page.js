'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

export default function IlanDetailPage() {
  useAuth();

  // const router = useRouter();
  // const { id } = router.query;
  const [ilan, setIlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     // API'den ilan detaylarını çek
  //     axios.get(`/api/ilanlar/${id}`)
  //       .then(response => {
  //         setIlan(response.data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         console.error('İlan detaylarını çekme hatası:', error);
  //         setLoading(false);
  //       });
  //   }
  // }, [id]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!ilan) {
    return <p>İlan bulunamadı</p>;
  }

  return (
    <div>
      <h1>{ilan.baslik}</h1>
      <p>{ilan.aciklama}</p>
      <p>Durum: {ilan.status}</p>
    </div>
  );
}
