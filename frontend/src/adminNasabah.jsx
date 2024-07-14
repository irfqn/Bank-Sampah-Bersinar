/* eslint-disable no-unused-vars */
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
} from "@/components/ui/table";
import "./adminNasabah.css";

const AdminNasabah = () => {
  return (
    <div className="flex">
      <Sidebar />
      <NasabahMain />
    </div>
  );
};

const NasabahMain = () => {
  const [nasabahData, setNasabahData] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchNasabahData = async () => {
      try {
        const response = await fetch("https://bank-sampah-bersinar.azurewebsites.net/api/user/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNasabahData(data);
        } else {
          throw new Error("Failed to fetch nasabah data");
        }
      } catch (error) {
        console.error("Error fetching nasabah data:", error);
      }
    };

    fetchNasabahData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredNasabah = nasabahData.filter((nasabah) =>
    (nasabah.firstName?.toLowerCase().includes(searchName.toLowerCase()) ||
     nasabah.lastName?.toLowerCase().includes(searchName.toLowerCase()))
  );

  return (
    <div
      className="h-screen flex-1 p-7 nasabah-main-page"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <h1 className="text-2xl font-semibold ">Nasabah</h1>
      <main className="nasabah-container">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search..."
            style={{ width: "200px" }}
            value={searchName}
            onChange={handleSearchChange}
          />
          <Button>
            <CiSearch />
          </Button>
        </div>
        <Card className="nasabah-card">
          <Table>
            <TableCaption>List of Nasabah</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Birth Place</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNasabah.map((nasabah) => (
                <TableRow key={nasabah._id}>
                  <TableCell>{nasabah.firstName}</TableCell>
                  <TableCell>{nasabah.lastName}</TableCell>
                  <TableCell>{nasabah.email}</TableCell>
                  <TableCell>{nasabah.birthPlace}</TableCell>
                  <TableCell>{formatDate(nasabah.birthDate)}</TableCell>
                  <TableCell>{nasabah.phone}</TableCell>
                  <TableCell>{nasabah.nik}</TableCell>
                  <TableCell>{nasabah.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default AdminNasabah;
