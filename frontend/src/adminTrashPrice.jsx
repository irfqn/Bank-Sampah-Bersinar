/* eslint-disable react/prop-types */
// import { useState } from "react";
// import Sidebar from "./components/ui/sidebar";
// import { Label } from "@radix-ui/react-label";
// import { Button } from "./components/ui/button";
// import { Card } from "./components/ui/card";
// import { TrashTable } from "./components/ui/tpricetable";
// import { Input } from "./components/ui/input";
// import "./adminTrashPrice.css";

// const AdminTPrice = () => {
//     const [trash, setTrash] = useState("");
//     const [month, setMonth] = useState("");
//     const [price, setPrice] = useState("");

//     const handleSubmit = async () => {
//         console.log("Submitting data:", { trash, month, price });

//         // Periksa apakah trash tidak kosong
//         if (trash === '') {
//             console.error("Error: Trash value is empty");
//             return;
//         }

//         try {
//             // Pengiriman permintaan ke server
//             const response = await fetch("http://localhost:3000/api/user/price", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     trash: trash,
//                     month: month,
//                     price: parseFloat(price)
//                 })
//             });

//             // Penanganan respons dari server
//             if (!response.ok) {
//                 throw new Error("Request failed with status " + response.status);
//             }
//             const data = await response.json();
//             console.log("Response:", data);
//             // Reset nilai input fields setelah pengiriman berhasil
//             setTrash("");
//             setMonth("");
//             setPrice("");
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="flex">
//             <Sidebar />
//             <TPriceMain
//                 trash={trash}
//                 setTrash={setTrash}
//                 month={month}
//                 setMonth={setMonth}
//                 price={price}
//                 setPrice={setPrice}
//                 handleSubmit={handleSubmit}
//             />
//         </div>
//     );
// };

// // eslint-disable-next-line react/prop-types
// const TPriceMain = ({ trash, setTrash, month, setMonth, price, setPrice, handleSubmit }) => {
//     return (
//         <div className="h-screen flex-1 p-7 tp-main-page" style={{ backgroundColor: "#FFFFFF" }}>
//             <h1 className="text-2xl font-semibold">Trash Price</h1>
//             <main className="tp-container">
//                 <div className="tp-left">
//                     <div className="input-price">
//                         <Label>Trash Type</Label>
//                         <SelectDemo value={trash} onChange={setTrash} style={{width: "180px"}}/>
//                     </div>
//                     <div className="input-price">
//                         <Label>Month</Label>
//                         <Input
//                             type="month"
//                             style={{ width: "180px" }}
//                             value={month}
//                             onChange={(e) => setMonth(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-price">
//                         <Label>Price</Label>
//                         <Input
//                             type="number"
//                             style={{ width: "180px" }}
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                         />
//                     </div>
//                     <Button
//                         style={{ backgroundColor: "green", color: "white", width: "180px" }}
//                         onClick={handleSubmit}
//                     >
//                         Submit
//                     </Button>
//                 </div>
//                 <div className="tp-right">
//                     <Input type="month" style={{ width: "180px" }} />
//                     <Card>
//                         <TrashTable />
//                     </Card>
//                 </div>
//             </main>
//         </div>
//     );
// };

// // Komponen SelectDemo diintegrasikan di sini
// // eslint-disable-next-line react/prop-types
// const SelectDemo = ({ value, onChange }) => {
//     const handleSelectChange = (event) => {
//         onChange(event.target.value);
//     };

//     return (
//         <select
//             value={value}
//             onChange={handleSelectChange}
//             className="bg-white border border-gray-300 rounded p-1 w-44"
//         >
//             <option value="">Select trash</option>
//             <option value="B8-B9">B8-B9</option>
//             <option value="BW-Bening-Warna">BW-Bening-Warna</option>
//             <option value="K1-K3-K4-K5-K6-K7-Tabloid">K1-K3-K4-K5-K6-K7-Tabloid</option>
//             <option value="K2">K2</option>
//             <option value="K9">K9</option>
//         </select>
//     );
// };


// export default AdminTPrice;

import { useState, useEffect } from "react";
import Sidebar from "./components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import "./adminTrashPrice.css";

// Komponen SelectDemo yang dimasukkan kembali
const SelectDemo = ({ value, onChange }) => {
    const handleSelectChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <select
            value={value}
            onChange={handleSelectChange}
            className="bg-white border border-gray-300 rounded p-1 w-44"
        >
            <option value="">Select trash</option>
            <option value="B8-B9">B8-B9</option>
            <option value="BW-Bening-Warna">BW-Bening-Warna</option>
            <option value="K1-K3-K4-K5-K6-K7-Tabloid">K1-K3-K4-K5-K6-K7-Tabloid</option>
            <option value="K2">K2</option>
            <option value="Kemasan Obat">Kemasan Obat</option>
            <option value="Mika">Mika</option>
            <option value="P12-Mix. BM- Bening-P14">P12-Mix. BM- Bening-P14</option>
            <option value="P17-P34-P37-Kemasan">P17-P34-P37-Kemasan</option>
            <option value="P20">P20</option>
            <option value="P21">P21</option>
            <option value="P22-P23">P22-P23</option>
            <option value="P31-Galon Le-mineral">P31-Galon Le-mineral</option>
            <option value="P32">P32</option>
            <option value="P38-P39">P38-P39</option>
            <option value="P5">P5</option>
            <option value="P7 - Tutup Botol-P29">P7 - Tutup Botol-P29</option>
            <option value="P7-P8">P7-P8</option>
            <option value="S1-A3">S1-A3</option>
        </select>
    );
};

const AdminTPrice = () => {
    const [trash, setTrash] = useState("");
    const [leftMonth, setLeftMonth] = useState("");
    const [rightMonth, setRightMonth] = useState("");
    const [price, setPrice] = useState("");
    const [trashData, setTrashData] = useState([]);

    const handleSubmit = async () => {
        console.log("Submitting data:", { trash, leftMonth, price });

        // Periksa apakah trash tidak kosong
        if (trash === '') {
            console.error("Error: Trash value is empty");
            return;
        }

        try {
            // Pengiriman permintaan ke server
            const response = await fetch("https://bank-sampah-bersinar.azurewebsites.net/api/user/price", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trash: trash,
                    month: leftMonth,
                    price: parseFloat(price)
                })
            });

            // Penanganan respons dari server
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            const data = await response.json();
            console.log("Response:", data);
            // Reset nilai input fields setelah pengiriman berhasil
            setTrash("");
            setLeftMonth("");
            setRightMonth("");
            setPrice("");
            // Ambil ulang data trash setelah menambahkan data baru
            fetchData();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchData = async () => {
        try {
            // Bangun query string dari parameter month
            const params = new URLSearchParams({ month: rightMonth });

            // Pengambilan data trash dari API dengan parameter month
            const response = await fetch(`https://bank-sampah-bersinar.azurewebsites.net/api/user/getPrice?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Penanganan respons dari server
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            const data = await response.json();
            console.log("Trash data:", data);
            // Simpan data trash ke dalam state
            setTrashData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Panggil fetchData saat komponen dimuat dan saat nilai rightMonth berubah
    useEffect(() => {
        fetchData();
    }, [rightMonth]);

    return (
        <div className="flex">
            <Sidebar />
            <TPriceMain
                trash={trash}
                setTrash={setTrash}
                leftMonth={leftMonth}
                setLeftMonth={setLeftMonth}
                rightMonth={rightMonth}
                setRightMonth={setRightMonth}
                price={price}
                setPrice={setPrice}
                handleSubmit={handleSubmit}
                trashData={trashData}
            />
        </div>
    );
};

const TPriceMain = ({ trash, setTrash, leftMonth, setLeftMonth, rightMonth, setRightMonth, price, setPrice, handleSubmit, trashData }) => {
    return (
        <div className="h-screen flex-1 p-7 tp-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold">Trash Price</h1>
            <main className="tp-container">
                <div className="tp-left">
                    <div className="input-price">
                        <Label>Trash Type</Label>
                        <SelectDemo value={trash} onChange={setTrash} style={{ width: "180px" }} />
                    </div>
                    <div className="input-price">
                        <Label>Month</Label>
                        <Input
                            type="month"
                            style={{ width: "180px" }}
                            value={leftMonth}
                            onChange={(e) => setLeftMonth(e.target.value)}
                        />
                    </div>
                    <div className="input-price">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            style={{ width: "180px" }}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <Button
                        style={{ backgroundColor: "green", color: "white", width: "180px" }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
                <div className="tp-right">
                    <Label>Month</Label>
                    {/* Input bertipe month untuk tabel TrashTable */}
                    <Input
                        type="month"
                        style={{ width: "180px" }}
                        value={rightMonth}
                        onChange={(e) => setRightMonth(e.target.value)}
                    />
                    {/* Tabel TrashTable dimasukkan di sini */}
                    <Card className="searchName">
                        <TrashTable data={trashData} />
                    </Card>
                </div>
            </main>
        </div>
    );
};

// Komponen TrashTable dimasukkan kembali
const TrashTable = ({ data }) => {
    // Jika data kosong, tampilkan pesan "Please select month"
    if (data.length === 0) {
        return (
            <Table>
                <TableCaption>A list of Trash Price.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan="2" style={{ textAlign: "center" }}>Please select month</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    // Jika ada data, tampilkan data seperti biasa
    return (
        <Table>
            <TableCaption>A list of Trash Price.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((price) => (
                    <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.trash}</TableCell>
                        <TableCell>{price.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};



export default AdminTPrice;
