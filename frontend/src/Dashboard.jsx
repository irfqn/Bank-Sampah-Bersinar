/* eslint-disable react/prop-types */
import './Dashboard.css'
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
// import TableDemo from "./components/ui/DashboardTable"
import Navbar from './components/ui/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
// import DashboardTable from './components/ui/DashboardTable';

export function CarouselDashboard() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/education");
        if (!response.ok) {
          throw new Error("Failed to fetch education data");
        }
        const data = await response.json();
        setEducation(data.reverse());
        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchEducationData();
  }, []);

  return (
    <Carousel className="carousel shadow-lg">
      <CarouselContent>
        {education.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="carousel-card">
                <CardContent className="carousel-content p-6">
                  <img src={item.picture} alt={item.title} className="gambar" />
                  <CardTitle className="judul">{item.title}</CardTitle>
                  <p className="article">{item.article}</p>
                  <Button>Read More</Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const educationDummy=[
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export default function Dashboard() {
  const [totalHarga, setTotalHarga] = useState([]);
  const [transaction, setTransaction] = useState([])

  useEffect(() => {
    const fetchTotalHarga = async () => {
      try {
        const token = getCookie("token");
        console.log(token)
        const response = await fetch("http://localhost:3000/api/user/getTotalHarga", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTotalHarga(data);
        } else {
          throw new Error("Failed to fetch total harga");
        }
      } catch (error) {
        console.error("Error fetching total harga:", error);
      }
    };

    fetchTotalHarga();
  }, []);

  useEffect(()=>{
    const fetchStatus = async()=>{
      try {
        const token = getCookie("token")
        const response = await fetch("http://localhost:3000/api/user/getStatus",{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setTransaction(data);
        } else {
          throw new Error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchStatus()
  },[])

  // Fungsi untuk mengambil nilai cookie berdasarkan namanya
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  // Fungsi untuk menghitung total harga
  const calculateTotalHarga = () => {
    let total = 0;
    totalHarga.forEach(item => {
      total += item.totalHarga;
    });

    // Memformat total harga menjadi format mata uang yang diinginkan (misalnya, format rupiah)
    const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(total);

    return formattedTotalHarga;
  };

  return (
    <>
      <div className="min-h-full">
        <Navbar/>

        <header className="bg-white shadow" style={{backgroundColor:"#2C7865"}}>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{color:"white"}}>Dashboard</h1>
          </div>
        </header>
        <main>
          {/* flex-col md:flex-row */}
          <div className="content "> 
            <div className='kiri'>
              <div className="price">
                <Card className="current-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Current Price</CardTitle>
                    <CardDescription>on March 2024</CardDescription>
                    {/* <CardContent>
                      <h1>{calculateTotalHarga()}</h1>
                    </CardContent> */}
                  </CardHeader>
                  <CardContent>
                    <h1>{calculateTotalHarga()}</h1>
                  </CardContent>
                </Card>
                <Card className="predict-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Predict Price</CardTitle>
                    <CardDescription>on April 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h1>Rp 160.000</h1>
                  </CardContent>
                </Card>
              </div>
              <div className="education">
                <CarouselDashboard totalHarga={totalHarga}/> {/* Kirim prop totalHarga ke CarouselDashboard */}
              </div>
            </div>
            <div className="kanan">
              <Card className="history shadow-lg">
                <CardContent>
                  <DashboardTable transactions={transaction}/>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// eslint-disable-next-line react/prop-types
const DashboardTable = ({ transactions }) => {
  const reversedTransactions = [...transactions].reverse();

  return (
    <Table> 
      <TableCaption>A list of your recent transactions</TableCaption>
      <TableHeader className="dashboard-table-header">
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>NIK</TableHead>
          <TableHead>Rekening</TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="dashboard-table-body">
        {reversedTransactions.map((transaction, index) => (
          <TableRow key={index} style={{overflow:"scroll"}}>
            <TableCell>{`${transaction.firstName} ${transaction.lastName}`}</TableCell>
            <TableCell className="font-medium">{transaction.action}</TableCell>
            <TableCell>{transaction.nik}</TableCell>
            <TableCell>{transaction.rekening}</TableCell>
            <TableCell className="text-right">{transaction.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

