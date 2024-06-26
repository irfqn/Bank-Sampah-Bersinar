import React, { useEffect, useState, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import { detect, detect2 } from "./utils/detect";
import Navbar from "./components/ui/Navbar";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import "./TrashDetection.css";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const TrashDetection = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({ net: null, inputShape: [1, 0, 0, 3] });
  const [detectedClasses, setDetectedClasses] = useState([]);
  const [detectedScores, setDetectedScores] = useState([]);
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [prices, setPrices] = useState([]);

  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    tf.ready().then(async () => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const modelUrl = `${proxyUrl}https://bank-sampah-bersinar.web.app/model.json`;
      const yolov8 = await tf.loadGraphModel(modelUrl);

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
    });
  }, []);

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      try {
        const klasses = await detect(img, model, canvasRef.current);
        const scores = await detect2(img, model, canvasRef.current);
        setDetectedClasses(klasses);
        setDetectedScores(scores.map(score => parseFloat(score)));
        setIsScanCompleted(true);
      } catch (error) {
        console.error("Error detecting classes:", error);
      }
    };
  }, [model]);

  // Fungsi dan kode lainnya tetap sama

  return (
    <>
      <Navbar />
      <header className="bg-white shadow" style={{ backgroundColor: "#2C7865" }}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ color: "white" }}>Trash Detection</h1>
        </div>
      </header>
      <div className="td-container">
        <div className="td-content">
          <div>
            <h1 className="title">Upload Your Trash Here!</h1>
            <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
          </div>
          <Card className="scan-card shadow-lg">
            {!isScanCompleted ? (
              <>
                <div className="td-left">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                  <img ref={imageRef} style={{ display: "none" }} alt="Uploaded" />
                </div>
                <div className="td-right">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '10px' }}
                  />
                  <Button className="bg-black text-white mt-3" onClick={handleCapture}>Scan</Button>
                </div>
              </>
            ) : (
              <>
                <Button className="bg-black text-white mb-3" onClick={handleBack}>Back</Button>
                <DetectionResult
                  detectedClasses={detectedClasses}
                  detectedScores={detectedScores}
                  prices={prices}
                  onDeleteClass={handleDeleteClass}
                />
              </>
            )}
          </Card>
        </div>
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>
    </>
  );
};

export default TrashDetection;
