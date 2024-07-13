// // eslint-disable-next-line no-unused-vars
// import react, {useEffect,useState} from "react";
// import Sidebar from "./components/ui/sidebar"
// import { Card } from "./components/ui/card";
// import { Input } from "./components/ui/input";
// import { Button } from "./components/ui/button";
// import { CiSearch } from "react-icons/ci";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//     TableFooter
//   } from "@/components/ui/table"
// import "./adminMitra.css"


// const AdminMitra=()=>{
//     return(
//         <div className="flex">
//             <Sidebar/>
//             <MitraMain/>
//         </div>
//     )
// }

// const MitraMain=()=>{
//     const [mitraData, setMitraData]=useState(null)
//     const [searchName, setSearchName]=useState("")

//     useEffect(()=>{
//         const fetchMitraData=async()=>{
//             try {
//                 const response=await fetch(`http://localhost:3000/api/user/mitra`, {
//                     method:"GET",
//                     headers:{
//                         "Content-Types":"Application/json"
//                     }
//                 })
//                 if(response.ok){
//                     const data = await response.json()
//                     console.log(data)
//                     setMitraData(data)
//                 }else{
//                     throw Error("failed to fetch mitra data")
//                 }
//             } catch (error) {
//                 throw Error("Errow fetching mitra data:", error)
//             }
//         }

//         fetchMitraData()
//     },[])

//     const handleSearchChange=(event)=>{
//         setSearchName(event.target.value)
//     }

//     const handleSearch=async()=>{
//         try {
//             const response=await fetch(`http://localhost:3000/api/user/findMitra?name=${searchName}`,{
//                 method:"GET",
//                 headers:{
//                     "Content-Types":"application/json"
//                 }
//             })
//             if(response.ok){
//                 const data=await response.json()
//                 console.log(data)
//                 setMitraData(data)
//             }else{
//                 throw Error("failed to fetch mitra data")
//             }
//         } catch (error) {
//             console.error("Error fetching mitra data:", error);
//         }
//     }

//     return(
//         <div className="h-screen flex-1 p-7 mitra-main-page" style={{ backgroundColor: "#FFFFFF" }}>
//             <h1 className="text-2xl font-semibold ">Mitra</h1>
//             <main className="nasabah-container">
//                 <div className="flex">
//                     <Input type="text" placeholder="Search..." style={{width: "200px"}} value={searchName} onChange={handleSearchChange}/>
//                     <Button onClick={handleSearch}>
//                         <CiSearch />
//                     </Button>
//                 </div>
//                 <Card className="nasabah-card">
//                     <Table>
//                         <TableCaption>A list of Mitra.</TableCaption>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Mitra</TableHead>
//                                 <TableHead>Nominal</TableHead>
//                                 <TableHead>Date</TableHead>
//                                 <TableHead>Phone Number</TableHead>
//                                 <TableHead>Address</TableHead>
//                                 <TableHead>Email</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {mitraData &&
//                             mitraData.map((mitra) => (
//                                 <TableRow key={mitra._id}>
//                                     <TableCell className="font-medium">{mitra.name}</TableCell>
//                                     <TableCell>{mitra.nominal}</TableCell>
//                                     <TableCell>{mitra.date}</TableCell>
//                                     <TableCell>{mitra.phone}</TableCell>
//                                     <TableCell>{mitra.address}</TableCell>
//                                     <TableCell>{mitra.email}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                         <TableFooter>
//                         <TableRow>
//                             <TableCell colSpan={3}>Total Income</TableCell>
//                             <TableCell className="text-right">Rp2.500.000</TableCell>
//                         </TableRow>
//                         </TableFooter>
//                     </Table>
//                 </Card>
//             </main>
//         </div>
//     )
// }

// export default AdminMitra

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Sidebar from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { CiSearch } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import "./adminMitra.css";

const AdminMitra = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MitraMain />
    </div>
  );
};

const MitraMain = () => {
  const [mitraData, setMitraData] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchMitraData = async () => {
      try {
        const response = await fetch(`https://bank-sampah-bersinar.azurewebsites.net/api/user/mitra`, {
          method: "GET",
          headers: {
            "Content-Types": "Application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setMitraData(data);
          // Hitung total nominal
          const total = data.reduce(
            (acc, curr) => acc + parseInt(curr.nominal.replace(/\D/g, ''), 10),
            0
          );                    
          setTotalIncome(total);
        } else {
          throw Error("failed to fetch mitra data");
        }
      } catch (error) {
        throw Error("Error fetching mitra data:", error);
      }
    };

    fetchMitraData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://bank-sampah-bersinar.azurewebsites.net/api/user/findMitra?name=${searchName}`,
        {
          method: "GET",
          headers: {
            "Content-Types": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMitraData(data);
      } else {
        throw Error("failed to fetch mitra data");
      }
    } catch (error) {
      console.error("Error fetching mitra data:", error);
    }
  };

  return (
    <div
      className="h-screen flex-1 p-7 mitra-main-page"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <h1 className="text-2xl font-semibold ">Mitra</h1>
      <main className="nasabah-container">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search..."
            style={{ width: "200px" }}
            value={searchName}
            onChange={handleSearchChange}
          />
          <Button onClick={handleSearch}>
            <CiSearch />
          </Button>
        </div>
        <Card className="nasabah-card">
          <Table>
            <TableCaption>A list of Mitra.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mitra</TableHead>
                <TableHead>Nominal</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mitraData &&
                mitraData.map((mitra) => (
                  <TableRow key={mitra._id}>
                    <TableCell className="font-medium">{mitra.name}</TableCell>
                    <TableCell>{mitra.nominal}</TableCell>
                    <TableCell>{mitra.date}</TableCell>
                    <TableCell>{mitra.phone}</TableCell>
                    <TableCell>{mitra.address}</TableCell>
                    <TableCell>{mitra.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Income</TableCell>
                <TableCell className="text-right">
                  Rp {totalIncome.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default AdminMitra;
