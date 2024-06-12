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
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const token = getCookie("token");

    Promise.all([
      fetchData("https://bank-sampah-bersinar.onrender.com/api/user/getTotalHarga", token).then(setTotalHarga),
      fetchData("https://bank-sampah-bersinar.onrender.com/api/user/getStatus", token).then(setTransaction),
      fetchData(`https://bank-sampah-bersinar.onrender.com/api/user/getPrice?month=${new Date().toISOString().slice(0, 7)}`).then(setPrices),
      fetchData("https://bank-sampah-bersinar.onrender.com/api/user/education").then(data => setEducation(data.reverse())),
    ]).catch(error => console.error("Error fetching data:", error));
  }, []);

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
                    <h1>{calculateTotalHarga()}</h1>
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
