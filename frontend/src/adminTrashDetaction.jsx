import Sidebar from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import Webcam from "react-webcam";
import { useState, useRef, useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "./adminTrashDetaction.css";
import { detect, detect2 } from "./utils/detect";
import { Input } from "./components/ui/input";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const AdminTrashDetaction = () => {
  return (
    <div className="flex">
      <Sidebar />
      <TrashDetactionMain />
    </div>
  );
};

const TrashDetactionMain = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [detectedClasses, setDetectedClasses] = useState([]);
  const [detectedScores, setDetectedScores] = useState([]);
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [prices, setPrices] = useState([]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    tf.ready().then(async () => {
      await tf.ready();
      const modelUrl = `../best_web_model/model.json`;
      const yolov8 = await tf.loadGraphModel(modelUrl);
      console.log(yolov8);

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);
      console.log(warmupResults);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.toISOString().slice(0, 7);
        const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data prices");
        }
        const data = await response.json();
        console.log("Fetched prices", data);
        setPrices(data);
      } catch (error) {
        console.log("Error fetching prices:", error);
      }
    };
    fetchData();
  }, []);

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      try {
        const klasses = await detect(img, model, canvasRef.current);
        const scores = await detect2(img, model, canvasRef.current);
        console.log('Classes:', klasses);
        console.log('Scores:', scores);
        setDetectedClasses(klasses);
        setDetectedScores(scores.map(score => parseFloat(score)));
        setIsScanCompleted(true);
      } catch (error) {
        console.error("Error detecting classes:", error);
      }
    };
  }, [model]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          try {
            const klasses = await detect(img, model, canvasRef.current);
            const scores = await detect2(img, model, canvasRef.current);
            console.log('Classes:', klasses);
            console.log('Scores:', scores);
            setDetectedClasses(klasses);
            setDetectedScores(scores.map(score => parseFloat(score)));
            setIsScanCompleted(true);
          } catch (error) {
            console.error("Error detecting classes:", error);
          }
        };
        imageRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    setIsScanCompleted(false);
    setDetectedClasses([]);
    setDetectedScores([]);
  };

  const handleDeleteClass = (index) => {
    setDetectedClasses((prevClasses) => prevClasses.filter((_, i) => i !== index));
    setDetectedScores((prevScores) => prevScores.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex-1 p-7 td-main-page" style={{ backgroundColor: "#FFFFFF" }}>
      <h1 className="text-2xl font-semibold">Trash Detection</h1>
      <main className="td-container">
        <div>
          <p style={{ marginBottom: "1rem" }}>Lihat harga dan jenis sampah anda disini!</p>
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
                  ref={fileInputRef}
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
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </main>
    </div>
  );
};

const DetectionResult = ({ detectedClasses, detectedScores, prices, onDeleteClass }) => {
  console.log('Rendering DetectionResult with:', detectedClasses, detectedScores, prices);

  const totalHarga = detectedClasses.reduce((total, className) => {
    const priceData = prices.find(price => price.trash === className);
    if (priceData) {
      return total + parseInt(priceData.price);
    }
    return total;
  }, 0);

  return (
    <div>
      <h2>Tipe Sampah Yang Terdeteksi:</h2>
      <Card style={{ width: '300px', height: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Jenis Sampah</th>
              <th>Harga Sampah</th>
              <th>Scores</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {detectedClasses.length === 0 ? (
              <tr>
                <td colSpan="4">Tidak ada sampah yang terdeteksi.</td>
              </tr>
            ) : (
              detectedClasses.map((className, index) => {
                const priceData = prices.find(price => price.trash === className);
                const score = detectedScores[index];
                const formattedScore = typeof score === 'number' ? score.toFixed(2) : 'Tidak ada score';

                return (
                  <tr key={index}>
                    <td>{className}</td>
                    <td>{priceData ? `Rp ${priceData.price}` : 'Tidak ada data harga'}</td>
                    <td>{formattedScore}</td>
                    <td>
                      <Button
                        className="bg-red-500 text-white"
                        onClick={() => onDeleteClass(index)}
                      >
                        &#10005;
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Harga:</td>
              <td>{`Rp ${totalHarga}`}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
};

export default AdminTrashDetaction;
