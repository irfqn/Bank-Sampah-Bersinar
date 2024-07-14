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

const OutcomeTable = () => {
    const [data, setData] = useState([]);
    const [totalOutcome, setTotalOutcome] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/mitra', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                    // Hitung total nominal
                    const total = result.reduce((acc, curr) => acc + parseInt(curr.nominal.replace(/\D/g, ''), 10), 0);
                    setTotalOutcome(total);
                } else {
                    throw new Error("Failed to fetch outcome data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Table>
            <TableCaption>List of fund expenditures</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Perusahaan</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Tanggal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((outcome) => (
                    <TableRow key={outcome._id}>
                        <TableCell className="font-medium">{outcome.name}</TableCell>
                        <TableCell>{outcome.nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                        <TableCell>{new Date(outcome.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total Outcome</TableCell>
                    <TableCell className="text-right">
                        Rp {totalOutcome.toLocaleString('id-ID')}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default OutcomeTable;
