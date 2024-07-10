// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
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
} from "@/components/ui/table";
import "./adminPenyetoran.css";

const AdminPenyetoran = () => {
    return (
        <div className="flex">
            <Sidebar />
            <PenyetoranMain />
        </div>
    );
}

const PenyetoranMain = () => {
    return (
        <div className="h-screen flex-1 p-7 penyetoran-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Penyetoran Nasabah</h1>
            <main className="penyetoran-container">
                <Card className="penyetoran-card">
                    <RequestTable />
                </Card>
            </main>
        </div>
    );
}

const RequestTable = () => {
    const [formData, setFormData] = useState([]);
    const [actionValues, setActionValues] = useState({}); // State untuk menyimpan nilai dropdown untuk setiap baris

    useEffect(() => {
        mergeData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await fetch('https://bank-sampah-bersinar-2.onrender.com/api/user/getAllForms');
            if (!response.ok) {
                throw new Error('Failed to fetch form data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching form data:', error);
            throw error;
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://bank-sampah-bersinar-2.onrender.com/api/user/users');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    const mergeData = async () => {
        try {
            const formData = await fetchFormData();
            const userData = await fetchUserData();

            const mergedData = formData.map(form => {
                const user = userData.find(user => user._id === form.userId);
                return {
                    ...form,
                    firstName: user ? user.firstName : 'Unknown',
                    lastName: user ? user.lastName : 'Unknown',
                    nik: user ? user.nik : 'Unknown'
                };
            });

            setFormData(mergedData);
        } catch (error) {
            console.error('Error merging data:', error);
        }
    };

    const handleActionChange = (id, value) => {
        setActionValues(prevState => ({
            ...prevState,
            [id]: value // Simpan nilai dropdown untuk baris dengan ID tertentu
        }));
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const handleSubmit = async (id) => {
        const data = formData.find((form) => form._id === id);
        console.log(data);
        const action = actionValues[id]; // Ambil nilai dropdown untuk baris dengan ID tertentu

        // Masukkan nilai dropdown ke dalam data yang akan dikirim
        const postData = {
            ...data,
            action: action
        };

        console.log(postData);

        const response = await fetch('https://bank-sampah-bersinar-2.onrender.com/api/user/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            console.log('Transaction submitted successfully');
            
            // Reset trashClass array and totalHarga if status is "Transfered"
            if (action === 'Transfered') {
                const token = getCookie('token');
                const resetResponse = await fetch(`https://bank-sampah-bersinar-2.onrender.com/api/user/resetTrashClass/${data.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!resetResponse.ok) {
                    throw new Error('Failed to reset trashClass array and totalHarga');
                } else {
                    const resetData = await resetResponse.json();
                    console.log(resetData.message);
                    // Optionally, you may want to refresh the data here
                    mergeData();
                }
            }
        } else {
            console.error('Failed to submit transaction');
        }
    };

    return (
        <Table>
            <TableCaption>A list of requests.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>No Rekening</TableHead>
                    <TableHead>NIK</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Submit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {formData.map((data) => (
                    <TableRow key={data._id}>
                        <TableCell className="font-medium">{data.firstName} {data.lastName}</TableCell>
                        <TableCell>{data.rekening}</TableCell>
                        <TableCell>{data.nik}</TableCell>
                        <TableCell>{data.totalPrice}</TableCell>
                        <TableCell>
                            <select value={actionValues[data._id] || ''} onChange={(e) => handleActionChange(data._id, e.target.value)}>
                                <option value="">none</option>
                                <option value="Transfered">Transfered</option>
                                <option value="Proses">Proses</option>
                                <option value="reject">reject</option>
                            </select>
                        </TableCell>
                        <TableCell>
                            <button className="submit-button" onClick={() => handleSubmit(data._id)}>Submit</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default AdminPenyetoran;
