/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Sidebar from "./components/ui/sidebar"
import { Input } from "./components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "./components/ui/button"
import "./adminPendataan.css"

const AdminPendataan=()=>{
    const [formData, setFormData] = useState({
        name:"",
        nominal:"",
        date:"",
        phone:"",
        address:"",
        email:"",
    })

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value})
    }

    const handleMitra=async ()=>{
        try {
            console.log("Form Data:", formData)
            const response = await fetch("https://bank-sampah-bersinar.azurewebsites.net/api/user/pendataan",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data=await response.json()
            console.log(data)
            resetForm();
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const resetForm = () => {
        setFormData({
            name:"",
            nominal:"",
            date:"",
            phone:"",
            address:"",
            email:"",
        });
    }

    return(
        <div className="flex">
            <Sidebar/>
            <PendataanMain formData={formData} handleChange={handleChange} handleMitra={handleMitra}/>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
const PendataanMain=({formData, handleChange, handleMitra})=>{
    
    return(
        <div className="h-screen flex-1 p-7 pendataan-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Pendataan Mitra</h1>
            <p style={{marginBlock:"1rem"}}>Masukan data mitra disini!</p>
            <main className="pendataan-container">
                <div className="input-mitras">
                    <Label className="font-semibold">Nama Mitra</Label>
                    <Input type="text" placeholder="Mitra" style={{width: "300px"}} id="name" value={formData.name} onChange={handleChange}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Nominal</Label>
                    <Input type="text" placeholder="2000xxx" style={{width: "300px"}} id="nominal" value={formData.nominal} onChange={handleChange}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Tanggal</Label>
                    <Input type="date" placeholder="Mitra" style={{width: "300px"}} id="date" value={formData.date} onChange={handleChange}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Nomor Telephone</Label>
                    <Input type="tel" placeholder="081XXXXXXXXX" style={{width: "300px"}} id="phone" value={formData.phone} onChange={handleChange}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Alamat</Label>
                    <Input type="text" placeholder="Alamat Mitra" style={{width: "300px"}} id="address" value={formData.address} onChange={handleChange}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Email</Label>
                    <Input type="email" placeholder="Email" style={{width: "300px"}} id="email" value={formData.email} onChange={handleChange}/>
                </div>
                <Button style={{backgroundColor:"green", color:"white"}} onClick={handleMitra}>Submit</Button>
            </main>
        </div>
    )
}

export default AdminPendataan