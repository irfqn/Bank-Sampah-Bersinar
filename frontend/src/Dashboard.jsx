/* eslint-disable react/prop-types */
import './Dashboard.css';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Navbar from './components/ui/Navbar';
import { useState, useEffect } from 'react';

export function CarouselDashboard({ education }) {
  return (
    <Carousel className="carousel shadow-lg">
      <CarouselContent>
        {education.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="carousel-card">
                <CardContent className="carousel-content p-6">
                  <img src={item.picture} alt={item.title} className="gambar" />
                  <div className='carousel-content-child'>
                    <h1 className="judul">{item.title}</h1>
                    <p className="article">{item.article}</p>
                    <Button>Read More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function fetchData(url, token = null) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).then(response => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  });
}

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

export default function Dashboard() {
  const [totalHarga, setTotalHarga] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [prices, setPrices] = useState([]);
  const [predictedPrices, setPredictedPrices] = useState([]);
  const [education, setEducation] = useState([]);
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

  useEffect(() => {
    const token = getCookie("token");

    Promise.all([
      fetchData("http://localhost:3000/api/user/getTotalHarga", token).then(setTotalHarga),
      fetchData("http://localhost:3000/api/user/getStatus", token).then(setTransaction),
      fetchData(`http://localhost:3000/api/user/getPrice?month=${new Date().toISOString().slice(0, 7)}`).then(setPrices),
      fetchData("http://localhost:3000/api/user/education").then(data => setEducation(data.reverse())),
    ]).catch(error => console.error("Error fetching data:", error));

    // Fetch predicted prices for next month
    const fetchPredictedPrices = async () => {
      try {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        const nextMonthStr = nextMonth.toISOString().slice(0, 7); // Format YYYY-MM
        
        const promises = totalHarga.map(async transaksi => {
          return Promise.all(transaksi.trashClass.map(async trashClassItem => {
            const mappedTrashType = classMapping[trashClassItem] || trashClassItem;
            const response = await fetch("http://localhost:5000/api/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                trash_type: mappedTrashType,
                month: parseInt(nextMonthStr.split("-")[1], 10), // Extract month as an integer
              }),
            });

            const data = await response.json();
            return response.ok ? data.prediction : 0;
          }));
        });

        const results = await Promise.all(promises);
        const predictedTotalPrices = results.map(predictions => predictions.reduce((sum, price) => sum + price, 0));
        setPredictedPrices(predictedTotalPrices);
      } catch (error) {
        console.error("Error fetching predicted prices:", error);
      }
    };

    fetchPredictedPrices();
  }, [totalHarga]);

  const getCurrentMonthYear = () => {
    const date = new Date();
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  const getNextMonthYear = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  const calculateTotalHarga = () => {
    const totalPrice = totalHarga.reduce((total, transaksi) => {
      return total + transaksi.trashClass.reduce((subtotal, trashClassItem) => {
        const trash = prices.find(itemHarga => itemHarga.trash === trashClassItem);
        return subtotal + (trash ? parseInt(trash.price) : 0);
      }, 0);
    }, 0);

    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
  };

  const calculatePredictedTotalHarga = () => {
    const totalPredictedPrice = predictedPrices.reduce((total, price) => total + price, 0);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPredictedPrice);
  };

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow" style={{ backgroundColor: "#2C7865" }}>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#2C7865]-900" style={{ color: "white" }}>Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="content">
            <div className='kiri'>
              <div className="price">
                <Card className="current-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Current Price</CardTitle>
                    <CardDescription>{`on ${getCurrentMonthYear()}`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h1>{calculateTotalHarga()}</h1>
                  </CardContent>
                </Card>
                <Card className="predict-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Predict Price</CardTitle>
                    <CardDescription>{`on ${getNextMonthYear()}`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h1>{calculatePredictedTotalHarga()}</h1>
                  </CardContent>
                </Card>
              </div>
              <div className="education">
                <CarouselDashboard education={education} />
              </div>
            </div>
            <div className="kanan">
              <Card className="history shadow-lg">
                <CardContent>
                  <DashboardTable transactions={transaction} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import './Dashboard.css'; // Assuming you have CSS for the badge here

const Badge = ({ text, color }) => (
  <span className={`badge badge-${color}`}>{text}</span>
);

const DashboardTable = ({ transactions }) => {
  const reversedTransactions = [...transactions].reverse();

  const getBadgeColor = (action) => {
    switch (action) {
      case 'Proses':
        return 'yellow';
      case 'Transfered':
        return 'green';
      case 'reject':
        return 'red';
      default:
        return 'default'; // Default badge color if needed
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent transactions</TableCaption>
      <TableHeader className="dashboard-table-header">
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Rekening</TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="dashboard-table-body">
        {reversedTransactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{`${transaction.firstName} ${transaction.lastName}`}</TableCell>
            <TableCell className="font-medium">
              <Badge text={transaction.action} color={getBadgeColor(transaction.action)} />
            </TableCell>
            <TableCell>{transaction.createdAt.slice(0, 10)}</TableCell>
            <TableCell>{transaction.rekening}</TableCell>
            <TableCell className="text-right">{transaction.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
