import Navbar from "./components/ui/Navbar"
import { Card } from "./components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./components/ui/button";
// import React from 'react';
import Webcam from "react-webcam";
import "./TrashDetaction.css"

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

const TrashDetaction=()=>{
    return(
        <>
            <Navbar/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trash Detaction</h1>
                </div>
            </header>
            <div className="td-content">
                <div>
                    <h1 className="title">Upload Your Trash Here!</h1>
                    <p className="description">Lihat harga dan jenis sampah anda, lalu masukan ke keranjang</p>
                </div>
                <Card className="scan-card shadow-lg">
                    <div className="td-kiri">
                        <Webcam
                        videoConstraints = {videoConstraints}
                        />
                    </div>
                    <div className="td-kanan">
                        <Input id="picture" type="file" className="input"/>
                        <Button className="bg-black text-white">Submit</Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default TrashDetaction