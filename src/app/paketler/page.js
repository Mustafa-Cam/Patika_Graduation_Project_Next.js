"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

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

  const getRandomNumber = () => {

    // Rastgele sayı almak için istek at
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
    // Satın alma işlemini gerçekleştirmek için API'ye istek gönder
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
            <h2>{paket.type.charAt(0).toUpperCase() + paket.type.slice(1)}</h2>
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

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0,0,0,0.5)',
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
                    color: "Black",
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
                setShowModal(false)
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
