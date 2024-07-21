"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { getUserNameFromToken } from "../utils/auth";


export default function PaketlerPage() {
  useAuth();

  const paketler = [
    {
      id: 1,
      type: "SMALL",
      description:
        "Small paket, 1 aylık geçerlilik süresi ve 10 ilan hakkı sunar.",
    },
    {
      id: 2,
      type: "MEDIUM",
      description:
        "Medium paket, 1 aylık geçerlilik süresi ve 30 ilan hakkı sunar.",
    },
    {
      id: 3,
      type: "BIG",
      description:
        "Big paket, 1 aylık geçerlilik süresi ve 60 ilan hakkı sunar.",
    },
  ];

  const [randomNumber, setRandomNumber] = useState(null);
  const [enteredNumber, setEnteredNumber] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userPackage, setUserPackage] = useState(null);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    // Kullanıcıya ait paketleri getir
    const fetchUserPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = getUserNameFromToken(token); // Kullanıcı adını al
        console.log("Kullanıcı adı:", username);
        const response = await axios.get(`http://localhost:8080/api/v1/packages/username/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPackage(response.data);
        console.log("Kullanıcı paketi:", response.data);
      } catch (error) {
        console.error("Kullanıcı paketlerini getirme hatası:", error);
      }
    };

    fetchUserPackages();
  }, [refresh]);

  const getRandomNumber = () => {
    axios
      .get("http://localhost:8080/api/v1/packages/purchase/random-number", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRandomNumber(response.data);
      })
      .catch((error) => {
        console.error("Rastgele sayı alma hatası:", error);
      });
  };

  const handlePurchase = () => {
    axios
      .post("http://localhost:8080/api/v1/packages/purchase", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          enteredRandomNumber: enteredNumber,
          packageType: selectedPackage.type,
        },
      })
      .then((response) => {
        alert("Paket başarıyla satın alındı!");
        setShowModal(false);
        setEnteredNumber("");
        setRandomNumber(null);
        setRefresh(Math.random());
      })
      .catch((error) => {
        console.error("Paket satın alma hatası:", error);
        alert("Paket satın alma hatası.");
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <h1>Paketler</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {paketler.map((paket) => (
          <div
            key={paket.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h2>{paket.type.charAt(0).toUpperCase() + paket.type.slice(1).toLowerCase()}</h2>
            <p>{paket.description}</p>
            <button
              onClick={() => {
                setSelectedPackage(paket);
                setShowModal(true);
              }}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Satın Al
            </button>
          </div>
        ))}
      </div>

      {userPackage && (
  <div style={{ marginTop: "20px", width: "100%", textAlign: "center", color: "#007bff" }}>
    <h2 style={{ fontWeight: "bold" }}>Mevcut Paketiniz</h2>
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ fontWeight: "bold" }}>
        {userPackage.packageType.charAt(0).toUpperCase() + userPackage.packageType.slice(1).toLowerCase()}
      </h3>
      <p style={{ fontWeight: "bold" }}>{userPackage.description || "Bu paketin açıklaması bulunmamaktadır."}</p>
      <p style={{ fontWeight: "bold" }}>İlan Sayısı: {userPackage.adCount}</p>
      <p style={{ fontWeight: "bold" }}>Başlangıç Tarihi: {new Date(userPackage.startDate).toLocaleDateString()}</p>
      <p style={{ fontWeight: "bold" }}>Bitiş Tarihi: {new Date(userPackage.expiryDate).toLocaleDateString()}</p>
    </div>
  </div>
)}


      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(12,25,0,0.5)',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "blue",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h2>Paket Satın Al</h2>
            {randomNumber === null ? (
              <>
                <button
                  onClick={getRandomNumber}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Numara Al
                </button>
              </>
            ) : (
              <>
                <p>Rastgele Sayı: {randomNumber}</p>
                <input
                  type="text"
                  value={enteredNumber}
                  onChange={(e) => setEnteredNumber(e.target.value)}
                  placeholder="Sayiyi giriniz"
                  style={{
                    marginBottom: "10px",
                    padding: "5px",
                    width: "100%",
                    color: "black",
                  }}
                />
                <button
                  onClick={handlePurchase}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Satın Al
                </button>
              </>
            )}
            <button
              onClick={() => {
                setShowModal(false);
                setRandomNumber(null);
              }}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
