import React, { useState, useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import { SelectDemo } from "./components/ui/SelectDemo";
import { Button } from "./components/ui/button";
import "./Prediction.css";

const Prediction = () => {
  const [trashType, setTrashType] = useState("");
  const [predictionDate, setPredictionDate] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const classMapping = {
    'P5': 'P5', 
    'P7': 'P7-P8', 
    'P7 - Tutup': 'P7-P8', 
    'P12 - MIX': 'P12-Mix. BM- Bening-P14', 
    'P12 - BM': 'P12-Mix. BM- Bening-P14', 
    'P12 - BENING': 'P12-Mix. BM- Bening-P14', 
    'P14': 'P12-Mix. BM- Bening-P14', 
    'P1': 'P20', 
    'P8': 'P20', 
    'P21': 'P21', 
    'P9': 'P22-P23', 
    'P20': 'P22-P23', 
    'P22': 'P22-P23', 
    'P23': 'P22-P23', 
    'P26': 'P29', 
    'P29': 'P29', 
    'P31': 'P31-Galon Le-mineral', 
    'Lemineral': 'Le-mineral', 
    'P34': 'P17-P34-P37-Kemasan', 
    'P38': 'P38-P39', 
    'P39': 'P38-P39', 
    'PM': 'S1-A3', 
    'B8': 'B8-B9', 
    'B9': 'B8-B9', 
    'BW': 'BW-Bening-Warna', 
    'Bening': 'BW-Bening-Warna', 
    'Warna': 'BW-Bening-Warna', 
    'K1': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K3': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K4': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K5': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K6': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K7': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'Tabloid': 'K1-K3-K4-K5-K6-K7-Tabloid', 
    'K2': 'K2', 
    'Kemasan Obat': 'Kemasan Obat', 
    'Mika': 'Mika'
  };

  const handlePredict = async () => {
    const mappedTrashType = classMapping[trashType] || trashType;

    try {
      setLoading(true);
      const response = await fetch("https://bank-sampah-bersinar.onrender.com/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trash_type: mappedTrashType,
          month: parseInt(predictionDate.split("-")[1], 10), // Extract month as an integer
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.prediction);
      } else {
        console.error("Error in prediction response:", data);
      }
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPrice = async () => {
    const mappedTrashType = classMapping[trashType] || trashType;
    const currentMonth = new Date().toISOString().slice(0, 7); // Current month in format YYYY-MM
    try {
      const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
      const data = await response.json();
      if (response.ok) {
        const filteredData = data.find(item => item.trash === mappedTrashType);
        setCurrentPrice(filteredData ? filteredData.price : "Price not found");
      } else {
        console.error("Error in current price response:", data);
      }
    } catch (error) {
      console.error("Error fetching current price:", error);
    }
  };

  useEffect(() => {
    if (trashType) {
      fetchCurrentPrice();
    }
  }, [trashType]);

  return (
    <>
      <Navbar />
      <header className="bg-white shadow" style={{ backgroundColor: "#2C7865" }}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ color: "white" }}>
            Price Prediction
          </h1>
        </div>
      </header>
      <div className="prd-content">
        <div>
          <h1 className="title">Predict Your Trash Here!</h1>
          <p className="description">Pilih bulan dan jenis sampah anda, lalu lihat prediksi harganya</p>
        </div>
        <Card className="predict-card shadow-lg">
          <div className="prd-kiri">
            <h1 className="label">Jenis Sampah</h1>
            <SelectDemo value={trashType} onChange={setTrashType} />
            <h1 className="label">Tanggal Prediksi</h1>
            <input
              type="month"
              className="w-[180px] bg-white border rounded p-2"
              value={predictionDate}
              onChange={(e) => setPredictionDate(e.target.value)}
            />
            <Button className="bg-black text-white" onClick={handlePredict} disabled={loading}>
              Predict
            </Button>
          </div>
          <div className="prd-kanan">
            <Card className="current-price shadow-lg">
              <CardHeader>
                <CardTitle>Current Price</CardTitle>
                <CardDescription>from {new Date().toISOString().slice(0, 7)}</CardDescription>
                <CardContent>
                  <h1>{loading ? "Loading..." : currentPrice ? `Rp ${currentPrice}` : "Select trash type"}</h1>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="predict-price shadow-lg">
              <CardHeader>
                <CardTitle>Predict Price</CardTitle>
                <CardDescription>On {predictionDate}</CardDescription>
                <CardContent>
                  <h1>{loading ? "Loading..." : predictedPrice ? `Rp ${predictedPrice}` : "No prediction yet"}</h1>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Prediction;
