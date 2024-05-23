// import Navbar from "./components/ui/Navbar";
// import { Card, CardContent } from "./components/ui/card";
// import { SelectBank } from "./components/ui/SelectDemo";
// import { Input } from "./components/ui/input";
// import { CheckboxForm } from "./components/ui/checkbox2";
// import { Button } from "./components/ui/button";
// import "./FormPenyetoran.css";
// import { useEffect, useState } from "react";

// const FormPenyetoran = () => {
//     const [totalHarga, setTotalHarga] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTotalHarga = async () => {
//             try {
//                 const token = getCookie("token");
//                 const response = await fetch("http://localhost:3000/api/user/getTotalHarga", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setTotalHarga(data);
//                 } else {
//                     throw new Error("Failed to fetch total harga");
//                 }
//             } catch (error) {
//                 setError("Error fetching total harga");
//                 console.error("Error fetching total harga:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTotalHarga();
//     }, []);

//     const getCookie = (name) => {
//         const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//         return cookieValue ? cookieValue.pop() : '';
//     };

//     const calculateTotalHarga = () => {
//         let total = 0;
//         totalHarga.forEach(item => {
//             total += item.totalHarga;
//         });

//         const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR'
//         }).format(total);

//         return formattedTotalHarga;
//     };

//     const getCurrentMonthYear = () => {
//         const date = new Date();
//         const month = date.toLocaleString('default', { month: 'long' });
//         const year = date.getFullYear();
//         return `${month} ${year}`;
//     };

//     return (
//         <>
//             <Navbar />
//             <header className="bg-white shadow">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">Form</h1>
//                 </div>
//             </header>
//             <div className="form-content">
//                 <div>
//                     <h1 className="form-title">Deposit Your Trash Here!</h1>
//                     <p className="form-description">Isi form ini untuk membuktikan anda sudah melakukan penyetoran sampah</p>
//                 </div>
//                 <Card className="form-card shadow-lg">
//                     <CardContent className="form-card-content">
//                         <div>
//                             <p className="card-description">*Your last savings from {getCurrentMonthYear()}</p>
//                         </div>
//                         <div className="form-data">
//                             <div className="each-data">
//                                 <p>Price</p>
//                                 <h1>{loading ? "Loading..." : error ? error : calculateTotalHarga()}</h1>
//                             </div>
//                             <div className="status"></div>
//                         </div>
//                         <div className="bank">
//                             <p>Bank or E-Wallet</p>
//                             <SelectBank />
//                         </div>
//                         <div className="rekening">
//                             <p>No. Rekening or No. E-Wallet</p>
//                             <Input />
//                         </div>
//                         <div className="validation-check">
//                             <CheckboxForm />
//                         </div>
//                         <Button className="form-button">Submit</Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         </>
//     );
// };

// export default FormPenyetoran;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import { Card, CardContent } from "./components/ui/card";
// import { SelectBank } from "./components/ui/SelectDemo"; // Import komponen SelectBank
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
import "./FormPenyetoran.css";

const FormPenyetoran = () => {
    const [totalHarga, setTotalHarga] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bank, setBank] = useState("");
    const [rekening, setRekening] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const fetchTotalHarga = async () => {
            try {
                const token = getCookie("token");
                const response = await fetch("http://localhost:3000/api/user/getTotalHarga", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTotalPrice(data.totalPrice);
                    setTotalHarga(data);
                } else {
                    throw new Error("Failed to fetch total harga");
                }
            } catch (error) {
                setError("Error fetching total harga");
                console.error("Error fetching total harga:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalHarga();
    }, []);

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const calculateTotalHarga = () => {
        let total = 0;
        totalHarga.forEach(item => {
            total += item.totalHarga;
        });

        const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(total);

        return formattedTotalHarga;
    };

    const getCurrentMonthYear = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const token = getCookie("token");
                const response = await fetch("http://localhost:3000/api/user/getTotalHarga", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const totalPrice = data.reduce((acc, item) => acc + item.totalHarga, 0);
                    const formattedTotalPrice = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    }).format(totalPrice);
                    setTotalPrice(formattedTotalPrice)
                    console.log(totalPrice)
                } else {
                    throw new Error("Failed to fetch total price");
                }
            } catch (error) {
                setError("Error fetching total price");
                console.error("Error fetching total price:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTotalPrice();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Tambahkan console.log di sini untuk melihat data sebelum dikirim
        setTotalPrice(calculateTotalHarga())
        console.log("Data yang akan dikirim:", { totalPrice, bank, rekening });
    
        setSubmitting(true);
        setSubmitError("");
        try {
            const token = getCookie("token");
            const response = await fetch("http://localhost:3000/api/user/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ totalPrice, bank, rekening }),
            });
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            setSubmitSuccess(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitError("Failed to submit form");
        } finally {
            setSubmitting(false);
        }
    };
    
    // eslint-disable-next-line react/prop-types
    const SelectBank = ({ value, onChange }) => {
        return (
            <select value={value} onChange={onChange} className="bg-white border border-gray-300 rounded p-1 w-44">
            <option value="">Select bank/e-wallet</option>
            <option value="VA-BCA">VA BCA</option>
            <option value="BNI">BNI</option>
            <option value="Mandiri">Mandiri</option>
            <option value="Gopay">Gopay</option>
            <option value="OVO">OVO</option>
        </select>
        );
    };

    return (
        <>
            <Navbar />
            <header className="bg-white shadow" style={{backgroundColor:"#2C7865"}}>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Form</h1>
                </div>
            </header>
            <div className="form-content">
                <div>
                    <h1 className="form-title">Deposit Your Trash Here!</h1>
                    <p className="form-description">Isi form ini untuk membuktikan anda sudah melakukan penyetoran sampah</p>
                </div>
                <Card className="form-card shadow-lg">
                    <CardContent className="form-card-content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p className="card-description">*Your last savings from {getCurrentMonthYear()}</p>
                            </div>
                            <div className="form-data">
                                <div className="each-data">
                                    <p>Price</p>
                                    <h1>{loading ? "Loading..." : error ? error : calculateTotalHarga()}</h1>
                                </div>
                                <div className="status"></div>
                            </div>
                            <div className="bank">
                                <p>Bank or E-Wallet</p>
                                <SelectBank value={bank} onChange={(e) => setBank(e.target.value)} /> {/* Gunakan komponen SelectBank */}
                            </div>
                            <div className="rekening">
                                <p>No. Rekening or No. E-Wallet</p>
                                <Input value={rekening} onChange={(e) => setRekening(e.target.value)} />
                            </div>
                            <Button type="submit" className="form-button" disabled={submitting}>
                                {submitting ? "Submitting..." : "Submit"}
                            </Button>
                            {submitError && <p className="error-message">{submitError}</p>}
                            {submitSuccess && <p className="success-message">Form berhasil disubmit</p>}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default FormPenyetoran;
