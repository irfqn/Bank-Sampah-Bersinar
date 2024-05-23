import Navbar from "./components/ui/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card"
import { SelectDemo } from "./components/ui/SelectDemo"
import { Button } from "./components/ui/button"
// import { DatePicker } from "./components/ui/datepicker"
import "./Prediction.css"

const Prediction=()=>{
    return(
        <>
            <Navbar/>
            <header className="bg-white shadow" style={{backgroundColor:"#2C7865"}}>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{color:"white"}}>Price Prediction</h1>
                </div>
            </header>
            <div className="prd-content">
                <div>
                    <h1 className="title">Predict Your Trash Here!</h1>
                    <p className="description">Pilih bulan dan jenis sampah anda, lalu lihat prediksi harganya</p>
                </div>
                <Card className="predict-card shadow-lg">
                    <div className="prd-kiri">
                        <h1 className="label">Jenis Sampah</h1>
                        <SelectDemo/>
                        <h1 className="label">Tanggal Prediksi</h1>
                        <input type="month" className="w-[180px] bg-white border rounded p-2"/>
                        <Button className="bg-black text-white">Predict</Button>
                        {/* <DatePicker/> */}
                    </div>
                    <div className="prd-kanan">
                        <Card className="current-price shadow-lg">
                            <CardHeader>
                                <CardTitle>Current Price</CardTitle>
                                <CardDescription>from March 2024</CardDescription>
                                <CardContent>
                                <h1>Rp 150.000</h1>
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card className="predict-price shadow-lg">
                            <CardHeader>
                                <CardTitle>Predict Price</CardTitle>
                                <CardDescription>On April 2024</CardDescription>
                                <CardContent>
                                <h1>Rp 160.000</h1>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Prediction