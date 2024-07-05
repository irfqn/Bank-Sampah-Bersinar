// import Sidebar from "./components/ui/sidebar"
// import { Card } from "./components/ui/card"
// // import { RequestTable } from "./components/ui/requestTable"
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
// // import { Button } from "./button"
// import { Button } from "./components/ui/button"
// import "./adminPenyetoran.css"

// const request = [
//     {
//         id:1,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//     {
//         id:2,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//     {
//         id:3,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//     {
//         id:4,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//     {
//         id:5,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//     {
//         id:6,
//         name: "John Doe",
//         noRekening: 1234567890,
//         nik: "1234567890123456",
//         nominal: 100.000,
//     },
//   ]

// const AdminPenyetoran=()=>{
//     return(
//         <div className="flex">
//             <Sidebar/>
//             <PenyetoranMain/>
//         </div>
//     )
// }

// const PenyetoranMain=()=>{
//     return(
//         <div className="h-screen flex-1 p-7 penyetoran-main-page" style={{ backgroundColor: "#FFFFFF" }}>
//             <h1 className="text-2xl font-semibold ">Penyetoran Nasabah</h1>
//             <main className="penyetoran-container">
//                     <Card className="penyetoran-card">
//                         <RequestTable/>
//                     </Card>
//             </main>
//         </div>
//     )
// }

// const RequestTable=()=>{
//     return (
//         <Table>
//             <TableCaption>A list of request.</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>No Rekening</TableHead>
//                     <TableHead>NIK</TableHead>
//                     <TableHead>Nominal</TableHead>
//                     <TableHead>Aksi</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {request.map((request) => (
//                     <TableRow key={request.id}>
//                         <TableCell className="font-medium">{request.name}</TableCell>
//                         <TableCell>{request.noRekening}</TableCell>
//                         <TableCell>{request.nik}</TableCell>
//                         <TableCell>{request.nominal}</TableCell>
//                         <TableCell>
//                             <Button style={{ backgroundColor: 'green', marginRight: '5px' , color:"white"}}>Terima</Button> {/* Tombol 'Ya' */}
//                             <Button style={{ backgroundColor:"red" , color:"white"}}>Tolak</Button> {/* Tombol 'Tidak' */}
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//                 <TableRow>
//                     <TableCell colSpan={3}>Total dana sekarang</TableCell>
//                     <TableCell className="text-right">Rp 1.000.000</TableCell>
//                 </TableRow>
//             </TableFooter>
//         </Table>
//     )
// }

// export default AdminPenyetoran

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

    const handleSubmit = async (id) => {
        const data = formData.find((form) => form._id === id);
        console.log(data)
        const action = actionValues[id]; // Ambil nilai dropdown untuk baris dengan ID tertentu

        // Masukkan nilai dropdown ke dalam data yang akan dikirim
        const postData = {
            ...data,
            action: action
        };

        console.log(postData)

        const response = await fetch('https://bank-sampah-bersinar-2.onrender.com/api/user/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            console.log('Transaction submitted successfully');
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
