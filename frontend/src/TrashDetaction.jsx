import Navbar from "./components/ui/Navbar";
import { Card } from "./components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import Loader from "./components/ui/loader";
import ButtonHandler from "./components/ui/btn-handler";
import { detect, detect2, detectVideo } from "./utils/detect";
import "./TrashDetaction.css";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";
import { RiCameraSwitchFill } from "react-icons/ri"; // Import the icon

const TrashDetection = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [detectedClasses, setDetectedClasses] = useState([]);
  const [detectedScores, setDetectedScores] = useState([]);
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [prices, setPrices] = useState([]);
  const [facingMode, setFacingMode] = useState("user");

  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode // Dynamically set facingMode
  };

  const modelName = "best";

  useEffect(() => {
    tf.ready().then(async () => {
      await tf.ready();
      const modelUrl = `https://bank-sampah-bersinar.web.app/model.json`;
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
        const response = await fetch(`https://bank-sampah-bersinar-2.onrender.com/api/user/getPrice?month=${currentMonth}`);
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

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? { exact: "environment" } : "user"));
  };

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
                  <Button className="bg-black text-white mt-3" onClick={toggleFacingMode}>
                    <RiCameraSwitchFill />
                  </Button>
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

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

const submitTotalHarga = async (totalHarga, detectedClasses) => {
  try {
    const token = getCookie("token");
    const response = await fetch("https://bank-sampah-bersinar-2.onrender.com/api/user/totalHarga", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ totalHarga, detectedClasses }),
    });
    if (!response.ok) {
      throw new Error('Gagal mengirim total harga');
    }

    console.log('Total harga berhasil dikirim ke server');
  } catch (error) {
    console.error('Error:', error);
  }
};

const DetectionResult = ({ detectedClasses, detectedScores, prices, onDeleteClass }) => {
  const [submitMessage, setSubmitMessage] = useState('');

  const totalHarga = detectedClasses.reduce((total, className) => {
    const priceData = prices.find(price => price.trash === className);
    if (priceData) {
      return total + parseInt(priceData.price);
    }
    return total;
  }, 0);

  const handleSubmission = async () => {
    try {
      await submitTotalHarga(totalHarga, detectedClasses);
      setSubmitMessage('Sampah Anda sudah ditambahkan');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Tipe Sampah Yang Terdeteksi:</h2>
      <Card style={{ width: '300px', height: 'auto' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="jenis-sampah-column">Jenis Sampah</TableHead>
              <TableHead>Harga Sampah</TableHead>
              <TableHead>Scores</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detectedClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan="4">Tidak ada sampah yang terdeteksi.</TableCell>
              </TableRow>
            ) : (
              detectedClasses.map((className, index) => {
                const priceData = prices.find(price => price.trash === className);
                const score = detectedScores[index];
                const formattedScore = typeof score === 'number' ? score.toFixed(2) : 'Tidak ada score';

                return (
                  <TableRow key={index}>
                    <TableCell>{className}</TableCell>
                    <TableCell>{priceData ? priceData.price : 'Tidak ada data harga'}</TableCell>
                    <TableCell>{formattedScore}</TableCell>
                    <TableCell>
                      <button onClick={() => onDeleteClass(index)}>
                        ❌
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2">Total Harga:</TableCell>
              <TableCell>{`Rp ${totalHarga}`}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4">
                <Button className="buttonSubmit" onClick={handleSubmission}>
                  Submit Total Harga
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default TrashDetection;
