/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './adminHasil.css'; // Import CSS
import Sidebar from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table";

const AdminHasil = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7)); // Bulan dan tahun saat ini dalam format yyyy-MM
    const [data, setData] = useState([]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://bank-sampah-bersinar.azurewebsites.net/api/user/getStatus`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const [year, month] = selectedDate.split('-').map(Number);
    const filteredData = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year;
    });

    // Filter data yang berstatus 'transfered' dan hitung total nominalnya
    const totalTransfered = filteredData
        .filter(item => item.action && item.action.toLowerCase() === 'transfered')
        .reduce((total, item) => {
            const nominalValue = parseFloat(item.totalPrice.replace(/[^0-9,-]+/g,"").replace(",", "."));
            return total + nominalValue;
        }, 0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getStatusBadge = (status) => {
        let badgeClass = '';
        let badgeText = '';

        switch (status.toLowerCase()) {
            case 'transfered':
                badgeClass = 'badge badge-green';
                badgeText = 'Transferred';
                break;
            case 'proses':
                badgeClass = 'badge badge-yellow';
                badgeText = 'Proses';
                break;
            case 'reject':
                badgeClass = 'badge badge-red';
                badgeText = 'Reject';
                break;
            default:
                badgeClass = 'badge badge-gray';
                badgeText = status;
        }

        return (
            <span className={badgeClass}>
                {badgeText}
            </span>
        );
    };

    return (
        <div className="hasil-container flex">
            <Sidebar />
            <div className="h-screen flex-1 p-7 bg-white hasil-main-page">
                <h1 className="text-2xl font-semibold">Penyetoran Nasabah</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Select Month</label>
                        <input
                            type="month"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="border p-2"
                        />
                    </div>
                </div>
                <main className="hasil-container">
                    <Card className="hasil-card">
                        <div className="table-container">
                            <Table className="hasil-table">
                                <TableCaption>
                                    A list of Transaction
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>No Rekening</TableHead>
                                        <TableHead>NIK</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Nominal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.firstName} {item.lastName}</TableCell>
                                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                                            <TableCell>{item.rekening}</TableCell>
                                            <TableCell>{item.nik}</TableCell>
                                            <TableCell>{getStatusBadge(item.action)}</TableCell>
                                            <TableCell>{item.totalPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan="5">Total Transfered</TableCell>
                                        <TableCell>{totalTransfered.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default AdminHasil;
