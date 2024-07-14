/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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

const IncomeTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/getStatus');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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

    // Filter data yang berstatus 'transfered' dan hitung total nominalnya
    const totalTransfered = data
        .filter(item => item.action && item.action.toLowerCase() === 'transfered')
        .reduce((total, item) => {
            const nominalValue = parseFloat(item.totalPrice.replace(/[^0-9,-]+/g,"").replace(",", "."));
            return total + nominalValue;
        }, 0);

    return (
        <Table>
            <TableCaption>List of customer deposits</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>nasabah</TableHead>
                    <TableHead>tanggal</TableHead>
                    <TableHead>rekening</TableHead>
                    <TableHead>totalPrice</TableHead>
                    <TableHead>status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((nasabah, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{nasabah.firstName} {nasabah.lastName}</TableCell>
                        <TableCell>{formatDate(nasabah.createdAt)}</TableCell>
                        <TableCell>{nasabah.rekening}</TableCell>
                        <TableCell>{nasabah.totalPrice}</TableCell>
                        <TableCell>{getStatusBadge(nasabah.action)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan="3">Total Transfered</TableCell>
                    <TableCell colSpan="2">
                        {totalTransfered.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default IncomeTable;
