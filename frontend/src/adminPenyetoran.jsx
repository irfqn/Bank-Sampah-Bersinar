// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import { RiFileUploadFill } from "react-icons/ri";
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
};

const PenyetoranMain = () => {
    return (
        <div className="h-screen flex-1 p-7 penyetoran-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold">Penyetoran Nasabah</h1>
            <main className="penyetoran-container">
                <Card className="penyetoran-card">
                    <RequestTable />
                </Card>
            </main>
        </div>
    );
};

const RequestTable = () => {
    const [formData, setFormData] = useState([]);
    const [actionValues, setActionValues] = useState({});
    const [fileInputs, setFileInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInputRefs = useRef({});

    useEffect(() => {
        mergeData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/getAllForms');
            if (!response.ok) {
                throw new Error('Gagal mengambil data form');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching form data:', error);
            setError('Gagal mengambil data form');
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/users');
            if (!response.ok) {
                throw new Error('Gagal mengambil data pengguna');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Gagal mengambil data pengguna');
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
            [id]: value
        }));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileChange = async (id, file) => {
        const base64 = await convertToBase64(file);
        setFileInputs(prevState => ({
            ...prevState,
            [id]: base64
        }));
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const handleSubmit = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const data = formData.find((form) => form._id === id);
        const action = actionValues[id];
        const fileBase64 = fileInputs[id];

        // If action is 'Transfered', ensure that the file has been uploaded
        if (action === 'Transfered' && !fileBase64) {
            setError('Harap unggah foto untuk status Transfered.');
            setLoading(false);
            return;
        }

        const postData = {
            _id: data._id,
            totalPrice: data.totalPrice.replace(/\D/g, ''), // Remove non-numeric characters from totalPrice
            bank: data.bank,
            rekening: data.rekening,
            userId: data.userId,
            action: action,
            transferedPict: fileBase64 || '' // Send an empty string if no file was uploaded
        };

        // Log postData to check its format
        console.log('Post Data:', postData);

        try {
            // Only call the submitTransfered API if action is 'Transfered'
            if (action === 'Transfered') {
                const responseTransfered = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/submitTransfered', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                if (!responseTransfered.ok) {
                    const errorText = await responseTransfered.text();
                    throw new Error(`Gagal mengirim transaksi: ${errorText}`);
                }

                const token = getCookie('token');
                const resetResponse = await fetch(`https://bank-sampah-bersinar.azurewebsites.net/api/user/resetTrashClass/${data.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!resetResponse.ok) {
                    const errorText = await resetResponse.text();
                    throw new Error(`Gagal mereset array trashClass dan totalHarga: ${errorText}`);
                }
            }

            // Call the createTransaction API
            const responseStatus = await fetch('https://bank-sampah-bersinar.azurewebsites.net/api/user/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!responseStatus.ok) {
                const errorText = await responseStatus.text();
                throw new Error(`Gagal membuat transaksi: ${errorText}`);
            }

            setLoading(false);
            setSuccess('Transaksi berhasil disubmit');
            window.alert('Transaksi berhasil disubmit'); // Show success alert

            // Keep the selected action after submission
            setActionValues(prevState => ({
                ...prevState,
                [id]: action
            }));

            mergeData(); // Refresh the data after successful submission

        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    const triggerFileInput = (id) => {
        if (fileInputRefs.current[id]) {
            fileInputRefs.current[id].click();
        }
    };

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {loading && <div>Memuat...</div>}
            <Table>
                <TableCaption>Daftar permintaan.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>No Rekening</TableHead>
                        <TableHead>NIK</TableHead>
                        <TableHead>Nominal</TableHead>
                        <TableHead>Aksi</TableHead>
                        <TableHead>Upload Foto</TableHead>
                        <TableHead>Submit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formData.length > 0 ? formData.map((data) => (
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
                                {actionValues[data._id] === 'Transfered' && (
                                    <>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={el => (fileInputRefs.current[data._id] = el)}
                                            onChange={(e) => handleFileChange(data._id, e.target.files[0])}
                                        />
                                        <RiFileUploadFill
                                            style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                            onClick={() => triggerFileInput(data._id)}
                                        />
                                    </>
                                )}
                            </TableCell>
                            <TableCell>
                                <button className="submit-button" onClick={() => handleSubmit(data._id)}>Submit</button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan="7">Tidak ada data tersedia</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminPenyetoran;
