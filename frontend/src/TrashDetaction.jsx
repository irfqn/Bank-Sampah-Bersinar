/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import Navbar from "./components/ui/Navbar"
// import { Card } from "./components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "./components/ui/button";
// // import React from 'react';
// import Webcam from "react-webcam";
// import "./TrashDetaction.css"

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
//   };

// const TrashDetaction=()=>{
//     return(
//         <>
//             <Navbar/>
//             <header className="bg-white shadow">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trash Detaction</h1>
//                 </div>
//             </header>
//             <div className="td-content">
//                 <div>
//                     <h1 className="title">Upload Your Trash Here!</h1>
//                     <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
//                 </div>
//                 <Card className="scan-card shadow-lg">
//                     <div className="td-left">
//                         <Webcam
//                         videoConstraints = {videoConstraints}
//                         />
//                     </div>
//                     <div className="td-right">
//                         <Input id="picture" type="file" className="input"/>
//                         <Button className="bg-black text-white">Submit</Button>
//                     </div>
//                 </Card>
//             </div>
//         </>
//     )
// }

// export default TrashDetaction

// import Navbar from "./components/ui/Navbar"
// import { Card } from "./components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "./components/ui/button";
// import { useState, useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import Webcam from "react-webcam";
// import Loader from "./components/ui/loader";
// import ButtonHandler from "./components/ui/btn-handler";
// import { detect, detect2, detectVideo } from "./utils/detect";
// import "./TrashDetaction.css"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
//   };

// const TrashDetaction=()=>{
//     const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
//     const [model, setModel] = useState({
//       net: null,
//       inputShape: [1, 0, 0, 3],
//     }); // init model & input shape
//     const [detectedClasses, setDetectedClasses] = useState([]);
//     const [detectedScores, setDetectedScores] = useState([])
//     const [prices, setPrices] = useState([])

//     // references
//     const imageRef = useRef(null);
//     const cameraRef = useRef(null);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     // model configs
//     const modelName = "best";

//     useEffect(() => {
//       tf.ready().then(async () => {
//         await tf.ready();
//         const modelUrl = `${window.location.origin}/best_web_model/model.json`;
//         const yolov8 = await tf.loadGraphModel(modelUrl); // load model
//         console.log(yolov8)

//         // warming up model
//         const dummyInput = tf.ones(yolov8.inputs[0].shape);
//         const warmupResults = yolov8.execute(dummyInput);
//         console.log(warmupResults)

//         setLoading({ loading: false, progress: 1 });
//         setModel({
//           net: yolov8,
//           inputShape: yolov8.inputs[0].shape,
//         }); // set model & input shape

//         tf.dispose([warmupResults, dummyInput]); // cleanup memory
//       });
//     }, []);

//     const handleImageLoad=async()=>{
//       try {
//         const klasses = await detect(imageRef.current, model, canvasRef.current);
//         const scores = await detect2(imageRef.current, model, canvasRef.current)
//         setDetectedClasses(klasses);
//         setDetectedScores(scores)
//         console.log(detectedScores)
//       } catch (error) {
//           console.error("Error detecting classes:", error);
//       }
//     }

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const currentDate = new Date();
//           const currentMonth = currentDate.toISOString().slice(0, 7); // Mendapatkan bulan saat ini dalam format YYYY-MM
//           const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch data prices");
//           }
//           const data = await response.json();
//           console.log("Fetched prices", data);
//           setPrices(data);
//         } catch (error) {
//           console.log("Error fetching prices:", error);
//         }
//       };
//       fetchData();
//     }, []);
    

//     return(
//         <>
//             <Navbar/>
//             <header className="bg-white shadow" style={{backgroundColor:"#2C7865"}}>
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{color:"white"}}>Trash Detection</h1>
//                 </div>
//             </header>
//             <div className="td-container">
//               <div className="td-content">
//                 <div>
//                   <h1 className="title">Upload Your Trash Here!</h1>
//                   <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
//                 </div>
//                 <img
//                   src="#"
//                   ref={imageRef}
//                   // onLoad={() => detect(imageRef.current, model, canvasRef.current)}
//                   onLoad={handleImageLoad}
//                 />
//                 <video
//                   autoPlay
//                   muted
//                   ref={cameraRef}
//                   onPlay={async () => {
//                     const klasses = await detect(cameraRef.current, model, canvasRef.current)
//                     console.log(klasses)
//                     setDetectedClasses(klasses)

//                     const scores = await detect2(cameraRef.current, model, canvasRef.current);
//                     console.log(scores);
//                     setDetectedScores(scores);
//                   }}
//                 />
//                 <video
//                   autoPlay
//                   muted
//                   ref={videoRef}
//                   onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
//                 />
//                 <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
                
//               </div>
//               <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} className="buttonH"/>
//               <DetectionResult detectedClasses={detectedClasses} prices={prices}/>
//             </div>
//         </>
//     )
// }


// const getCookie = (name) => {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : '';
// };

// const submitTotalHarga = async (totalHarga) => {
//   try {
//     const token = getCookie("token");
//     const response = await fetch("http://localhost:3000/api/user/totalHarga", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ totalHarga }),
//     });
//     if (!response.ok) {
//       throw new Error('Gagal mengirim total harga');
//     }

//     console.log('Total harga berhasil dikirim ke server');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


// const DetectionResult = ({ detectedClasses, prices, userId, detectedScores }) => {
//   // Hitung total harga dari harga sampah yang terdeteksi
//   const totalHarga = detectedClasses.reduce((total, className) => {
//     const priceData = prices.find(price => price.trash === className);
//     if (priceData) {
//       return total + parseInt(priceData.price);
//     }
//     return total;
//   }, 0);

//   const handleSubmission =()=>{
//     submitTotalHarga(totalHarga, userId)
//   }

//   return (
//     <div>
//       <h2>Tipe Sampah Yang Terdeteksi:</h2>
//       <Card style={{ width: "300px", height: "auto" }}>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {/* Menambahkan className pada kolom "Jenis Sampah" */}
//               <TableHead className="jenis-sampah-column">Jenis Sampah</TableHead>
//               <TableHead>Harga Sampah</TableHead>
//               {/* <TableHead>Scores</TableHead> */}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {detectedClasses.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan="2">Tidak ada sampah yang terdeteksi.</TableCell>
//               </TableRow>
//             ) : (
//               detectedClasses.map((className, index) => {
//                 // Cari harga sampah yang sesuai dengan kelas yang terdeteksi
//                 const priceData = prices.find(price => price.trash === className);
//                 // Jika harga ditemukan, tampilkan
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{className}</TableCell>
//                     <TableCell>{priceData ? priceData.price : "Tidak ada data harga"}</TableCell>
//                     {/* <TableCell>{detectedScores && detectedScores[index] ? detectedScores[index] : "Tidak ada score"}</TableCell> */}
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell>Total Harga</TableCell>
//               <TableCell>{`Rp ${totalHarga}`}</TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </Card>
//       <Button className="buttonSubmit" onClick={handleSubmission}>Submit</Button>
//     </div>
//   );
// };




// export default TrashDetaction

// import React, { useState, useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import Cookies from 'js-cookie';
// import Navbar from "./components/ui/Navbar";
// import { Card } from "./components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "./components/ui/button";
// import Loader from "./components/ui/loader";
// import ButtonHandler from "./components/ui/btn-handler";
// import { detect, detectVideo } from "./utils/detect";
// import "./TrashDetaction.css";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user",
// };

// const TrashDetaction = () => {
//   // State dan refs
//   const [loading, setLoading] = useState({ loading: true, progress: 0 });
//   const [model, setModel] = useState({
//     net: null,
//     inputShape: [1, 0, 0, 3],
//   });
//   const [detectedClasses, setDetectedClasses] = useState([]);
//   const [prices, setPrices] = useState([]);
//   const imageRef = useRef(null);
//   const cameraRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Fungsi untuk mendapatkan userId dari cookie
//   const getUserIdFromCookie = () => {
//     const token = Cookies.get('token'); // Dapatkan token dari cookie menggunakan js-cookie
//     if (token) {
//       const decodedToken = jwt_decode(token); // Dekode token menggunakan jwt-decode
//       return decodedToken.userId;
//     }
//     return null;
//   };

//   useEffect(() => {
//     // Load model TensorFlow
//     tf.ready().then(async () => {
//       await tf.ready();
//       const modelUrl = `${window.location.origin}/best_web_model/model.json`;
//       const yolov8 = await tf.loadGraphModel(modelUrl);
//       setLoading({ loading: false, progress: 1 });
//       setModel({
//         net: yolov8,
//         inputShape: yolov8.inputs[0].shape,
//       });
//     });
//   }, []);

//   useEffect(() => {
//     // Fetch prices data
//     const fetchData = async () => {
//       try {
//         const currentDate = new Date();
//         const currentMonth = currentDate.toISOString().slice(0, 7);
//         const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data prices");
//         }
//         const data = await response.json();
//         setPrices(data);
//       } catch (error) {
//         console.log("Error fetching prices:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fungsi untuk menangani pengiriman total harga
//   const handleSubmission = async (totalHarga) => {
//     const userId = getUserIdFromCookie(); // Dapatkan userId dari cookie
//     if (userId) {
//       try {
//         const token = Cookies.get('token'); // Dapatkan token dari cookie menggunakan js-cookie
//         const response = await fetch("http://localhost:3000/api/user/totalHarga", {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ totalHarga, userId })
//         });
//         if (!response.ok) {
//           throw new Error('Failed to submit total harga');
//         }
//         console.log('Total harga berhasil dikirim ke server');
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } else {
//       console.error('User ID tidak ditemukan.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trash Detaction</h1>
//         </div>
//       </header>
//       <div className="td-container">
//         <div className="td-content">
//           {/* Konten */}
//         </div>
//         <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} className="buttonH" />
//         <DetectionResult detectedClasses={detectedClasses} prices={prices} handleSubmission={handleSubmission} />
//       </div>
//     </>
//   );
// };

// // Komponen DetectionResult
// // Komponen DetectionResult
// const DetectionResult = ({ detectedClasses, prices, handleSubmission }) => {
//   // Hitung total harga dari harga sampah yang terdeteksi
//   const totalHarga = detectedClasses.reduce((total, className) => {
//     const priceData = prices.find(price => price.trash === className);
//     if (priceData) {
//       return total + parseInt(priceData.price);
//     }
//     return total;
//   }, 0);

//   // Penanganan pengiriman total harga
//   const handleSubmit = () => {
//     handleSubmission(totalHarga);
//   };

//   return (
//     <div>
//       <h2>Tipe Sampah Yang Terdeteksi:</h2>
//       <Card style={{ width: "300px", height: "auto" }}>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="jenis-sampah-column">Jenis Sampah</TableHead>
//               <TableHead>Harga Sampah</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {detectedClasses.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan="2">Tidak ada sampah yang terdeteksi.</TableCell>
//               </TableRow>
//             ) : (
//               detectedClasses.map((className, index) => {
//                 const priceData = prices.find(price => price.trash === className);
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{className}</TableCell>
//                     <TableCell>{priceData ? priceData.price : "Tidak ada data harga"}</TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell>Total Harga</TableCell>
//               <TableCell>{`Rp ${totalHarga}`}</TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </Card>
//       <Button className="buttonSubmit" onClick={handleSubmit}>Submit</Button>
//     </div>
//   );
// };


// export default TrashDetaction;

// import Navbar from "./components/ui/Navbar";
// import { Card } from "./components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "./components/ui/button";
// import { useState, useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import Webcam from "react-webcam";
// import Loader from "./components/ui/loader";
// import ButtonHandler from "./components/ui/btn-handler";
// import { detect, detectVideo } from "./utils/detect";
// import "./TrashDetaction.css";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };

// const TrashDetection = () => {
//     const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
//     const [model, setModel] = useState({
//         net: null,
//         inputShape: [1, 0, 0, 3],
//     }); // init model & input shape
//     const [detectedClasses, setDetectedClasses] = useState([]);
//     const [prices, setPrices] = useState([]);

//     // references
//     const imageRef = useRef(null);
//     const cameraRef = useRef(null);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     // model configs
//     const modelName = "best";

//     useEffect(() => {
//         tf.ready().then(async () => {
//             await tf.ready();
//             const modelUrl = `${window.location.origin}/best_web_model/model.json`;
//             const yolov8 = await tf.loadGraphModel(modelUrl); // load model
//             console.log(yolov8);

//             // warming up model
//             const dummyInput = tf.ones(yolov8.inputs[0].shape);
//             const warmupResults = yolov8.execute(dummyInput);
//             console.log(warmupResults);

//             setLoading({ loading: false, progress: 1 });
//             setModel({
//                 net: yolov8,
//                 inputShape: yolov8.inputs[0].shape,
//             }); // set model & input shape

//             tf.dispose([warmupResults, dummyInput]); // cleanup memory
//         });
//     }, []);

//     const handleImageLoad = async () => {
//         try {
//             const klasses = await detect(imageRef.current, model, canvasRef.current);
//             setDetectedClasses(klasses);
//         } catch (error) {
//             console.error("Error detecting classes:", error);
//         }
//     }

//     const handleVideoLoad = async () => {
//         try {
//             detectVideo(videoRef.current, model, canvasRef.current, (klasses) => {
//                 setDetectedClasses((prevClasses) => [...prevClasses, ...klasses]);
//             });
//         } catch (error) {
//             console.error("Error detecting classes in video:", error);
//         }
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const currentDate = new Date();
//                 const currentMonth = currentDate.toISOString().slice(0, 7); // Mendapatkan bulan saat ini dalam format YYYY-MM
//                 const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data prices");
//                 }
//                 const data = await response.json();
//                 console.log("Fetched prices", data);
//                 setPrices(data);
//             } catch (error) {
//                 console.log("Error fetching prices:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <header className="bg-white shadow">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trash Detection</h1>
//                 </div>
//             </header>
//             <div className="td-container">
//                 <div className="td-content">
//                     <div>
//                         <h1 className="title">Upload Your Trash Here!</h1>
//                         <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
//                     </div>
//                     <img
//                         src="#"
//                         ref={imageRef}
//                         onLoad={handleImageLoad}
//                     />
//                     <video
//                         autoPlay
//                         muted
//                         ref={cameraRef}
//                         onPlay={handleVideoLoad}
//                     />
//                     <video
//                         autoPlay
//                         muted
//                         ref={videoRef}
//                         onPlay={handleVideoLoad}
//                     />
//                     <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
//                 </div>
//                 <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} className="buttonH" />
//                 <DetectionResult detectedClasses={detectedClasses} prices={prices} />
//             </div>
//         </>
//     );
// }

// const getCookie = (name) => {
//     const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return cookieValue ? cookieValue.pop() : '';
// };

// const submitTotalHarga = async (totalHarga) => {
//     try {
//         const token = getCookie("token");
//         const response = await fetch("http://localhost:3000/api/user/totalHarga", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ totalHarga }),
//         });
//         if (!response.ok) {
//             throw new Error('Gagal mengirim total harga');
//         }

//         console.log('Total harga berhasil dikirim ke server');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// const DetectionResult = ({ detectedClasses, prices }) => {
//     const totalHarga = detectedClasses.reduce((total, className) => {
//         const priceData = prices.find(price => price.trash === className);
//         if (priceData) {
//             return total + parseInt(priceData.price);
//         }
//         return total;
//     }, 0);

//     const handleSubmission = () => {
//         submitTotalHarga(totalHarga);
//     }

//     return (
//         <div>
//             <h2>Tipe Sampah Yang Terdeteksi:</h2>
//             <Card style={{ width: "300px", height: "auto" }}>
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Jenis Sampah</TableHead>
//                             <TableHead>Harga Sampah</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {detectedClasses.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan="2">Tidak ada sampah yang terdeteksi.</TableCell>
//                             </TableRow>
//                         ) : (
//                             detectedClasses.map((className, index) => {
//                                 const priceData = prices.find(price => price.trash === className);
//                                 return (
//                                     <TableRow key={index}>
//                                         <TableCell>{className}</TableCell>
//                                         <TableCell>{priceData ? priceData.price : "Tidak ada data harga"}</TableCell>
//                                     </TableRow>
//                                 );
//                             })
//                         )}
//                     </TableBody>
//                     <TableFooter>
//                         <TableRow>
//                             <TableCell>Total Harga</TableCell>
//                             <TableCell>{`Rp ${totalHarga}`}</TableCell>
//                         </TableRow>
//                     </TableFooter>
//                 </Table>
//             </Card>
//             <Button className="buttonSubmit" onClick={handleSubmission}>Submit</Button>
//         </div>
//     );
// };

// export default TrashDetection;

// import Navbar from "./components/ui/Navbar"
// import { Card } from "./components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "./components/ui/button";
// import { useState, useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import Webcam from "react-webcam";
// import Loader from "./components/ui/loader";
// import ButtonHandler from "./components/ui/btn-handler";
// import { detect, detect2, detectVideo } from "./utils/detect";
// import "./TrashDetaction.css"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };

// const TrashDetaction = () => {
//     const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
//     const [model, setModel] = useState({
//       net: null,
//       inputShape: [1, 0, 0, 3],
//     }); // init model & input shape
//     const [detectedClasses, setDetectedClasses] = useState([]);
//     const [detectedScores, setDetectedScores] = useState([])
//     const [prices, setPrices] = useState([])

//     // references
//     const imageRef = useRef(null);
//     const cameraRef = useRef(null);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     // model configs
//     const modelName = "best";

//     useEffect(() => {
//       tf.ready().then(async () => {
//         await tf.ready();
//         const modelUrl = `${window.location.origin}/best_web_model/model.json`;
//         const yolov8 = await tf.loadGraphModel(modelUrl); // load model
//         console.log(yolov8)

//         // warming up model
//         const dummyInput = tf.ones(yolov8.inputs[0].shape);
//         const warmupResults = yolov8.execute(dummyInput);
//         console.log(warmupResults)

//         setLoading({ loading: false, progress: 1 });
//         setModel({
//           net: yolov8,
//           inputShape: yolov8.inputs[0].shape,
//         }); // set model & input shape

//         tf.dispose([warmupResults, dummyInput]); // cleanup memory
//       });
//     }, []);

//     const handleImageLoad = async () => {
//       try {
//         const klasses = await detect(imageRef.current, model, canvasRef.current);
//         const scores = await detect2(imageRef.current, model, canvasRef.current)
//         setDetectedClasses(klasses);
//         setDetectedScores(scores)
//         console.log(scores)
//       } catch (error) {
//         console.error("Error detecting classes:", error);
//       }
//     }

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const currentDate = new Date();
//           const currentMonth = currentDate.toISOString().slice(0, 7); // Mendapatkan bulan saat ini dalam format YYYY-MM
//           const response = await fetch(`http://localhost:3000/api/user/getPrice?month=${currentMonth}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch data prices");
//           }
//           const data = await response.json();
//           console.log("Fetched prices", data);
//           setPrices(data);
//         } catch (error) {
//           console.log("Error fetching prices:", error);
//         }
//       };
//       fetchData();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <header className="bg-white shadow" style={{ backgroundColor: "#2C7865" }}>
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ color: "white" }}>Trash Detection</h1>
//                 </div>
//             </header>
//             <div className="td-container">
//               <div className="td-content">
//                 <div>
//                   <h1 className="title">Upload Your Trash Here!</h1>
//                   <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
//                 </div>
//                 <img
//                   src="#"
//                   ref={imageRef}
//                   onLoad={handleImageLoad}
//                 />
//                 <video
//                   autoPlay
//                   muted
//                   ref={cameraRef}
//                   onPlay={async () => {
//                     if (cameraRef.current.videoWidth === 0 || cameraRef.current.videoHeight === 0) {
//                       console.error("Video size is invalid");
//                       return;
//                     }

//                     try {
//                       const klasses = await detect(cameraRef.current, model, canvasRef.current);
//                       console.log(klasses);
//                       setDetectedClasses(klasses);

//                       const scores = await detect2(cameraRef.current, model, canvasRef.current);
//                       console.log(scores);
//                       setDetectedScores(scores);
//                     } catch (error) {
//                       console.error("Error detecting classes or scores:", error);
//                     }
//                   }}
//                 />
//                 <video
//                   autoPlay
//                   muted
//                   ref={videoRef}
//                   onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
//                 />
//                 <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
//               </div>
//               <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} className="buttonH" />
//               <DetectionResult detectedClasses={detectedClasses} detectedScores={detectedScores} prices={prices} />
//             </div>
//         </>
//     )
// }

// const getCookie = (name) => {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : '';
// };

// const submitTotalHarga = async (totalHarga, detectedClasses) => {
//   try {
//     const token = getCookie("token");
//     const dataToSend = {
//       totalHarga,
//       detectedClasses,
//     };

//     console.log('Sending data to server:', JSON.stringify(dataToSend));

//     const response = await fetch("http://localhost:3000/api/user/totalHarga", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(dataToSend),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       throw new Error(`Gagal mengirim total harga: ${errorResponse.error}`);
//     }

//     console.log('Total harga dan kelas yang terdeteksi berhasil dikirim ke server');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// const DetectionResult = ({ detectedClasses, prices, userId, detectedScores }) => {
//   const [submitMessage, setSubmitMessage] = useState(''); // State untuk menyimpan pesan

//   const totalHarga = detectedClasses.reduce((total, className) => {
//     const priceData = prices.find(price => price.trash === className);
//     if (priceData) {
//       return total + parseInt(priceData.price);
//     }
//     return total;
//   }, 0);

//   const handleSubmission = async () => {
//     try {
//       await submitTotalHarga(totalHarga, detectedClasses);
//       setSubmitMessage('Sampah Anda sudah ditambahkan'); // Atur pesan setelah berhasil
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Tipe Sampah Yang Terdeteksi:</h2>
//       <Card style={{ width: '300px', height: 'auto' }}>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="jenis-sampah-column">Jenis Sampah</TableHead>
//               <TableHead>Harga Sampah</TableHead>
//               <TableHead>Scores</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {detectedClasses.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan="3">Tidak ada sampah yang terdeteksi.</TableCell>
//               </TableRow>
//             ) : (
//               detectedClasses.map((className, index) => {
//                 const priceData = prices.find(price => price.trash === className);
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{className}</TableCell>
//                     <TableCell>{priceData ? priceData.price : 'Tidak ada data harga'}</TableCell>
//                     <TableCell>{detectedScores[index] ? detectedScores[index] : 'Tidak ada score'}</TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan="2">Total Harga:</TableCell>
//               <TableCell>{totalHarga}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell colSpan="3">
//                 <Button className="buttonSubmit" onClick={handleSubmission}>
//                   Submit Total Harga
//                 </Button>
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </Card>

//       {/* Pesan setelah submit */}
//       {submitMessage && <p>{submitMessage}</p>}
//     </div>
//   );
// };



// export default TrashDetaction;

import Navbar from "./components/ui/Navbar";
import { Card } from "./components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import Loader from "./components/ui/loader";
import ButtonHandler from "./components/ui/btn-handler";
import { detect, detect2, detectVideo } from "./utils/detect";
import "./TrashDetaction.css";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./components/ui/table";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const TrashDetection = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [detectedClasses, setDetectedClasses] = useState([]);
  const [detectedScores, setDetectedScores] = useState([]);
  const [prices, setPrices] = useState([]);

  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const modelName = "best";

  useEffect(() => {
    tf.ready().then(async () => {
      await tf.ready();
      const modelUrl = `${window.location.origin}/best_web_model/model.json`;
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

  const handleImageLoad = async () => {
    try {
      const klasses = await detect(imageRef.current, model, canvasRef.current);
      const scores = await detect2(imageRef.current, model, canvasRef.current);
      setDetectedClasses(klasses);
      setDetectedScores(scores);
      console.log(scores);
    } catch (error) {
      console.error("Error detecting classes:", error);
    }
  };

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
          <img
            src="#"
            ref={imageRef}
            onLoad={handleImageLoad}
          />
          <video
            autoPlay
            muted
            ref={cameraRef}
            onPlay={async () => {
              const klasses = await detect(cameraRef.current, model, canvasRef.current);
              setDetectedClasses(klasses);

              const scores = await detect2(cameraRef.current, model, canvasRef.current);
              setDetectedScores(scores);
              console.log(scores);
            }}
          />
          <video
            autoPlay
            muted
            ref={videoRef}
            onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
          />
          <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
        </div>
        <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} className="buttonH" />
        <DetectionResult detectedClasses={detectedClasses} detectedScores={detectedScores} prices={prices} />
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
    const response = await fetch("http://localhost:3000/api/user/totalHarga", {
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

const DetectionResult = ({ detectedClasses, detectedScores, prices, userId }) => {
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
              {/* <TableHead>Scores</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {detectedClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan="3">Tidak ada sampah yang terdeteksi.</TableCell>
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
                    {/* <TableCell>{formattedScore}</TableCell> */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2">Total Harga:</TableCell>
              <TableCell>{`Rp ${totalHarga}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="3">
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
