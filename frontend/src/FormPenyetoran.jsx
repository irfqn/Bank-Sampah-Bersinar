import Navbar from "./components/ui/Navbar"
import { Card, CardContent } from "./components/ui/card"
import { SelectBank } from "./components/ui/SelectDemo"
import { Input } from "./components/ui/input"
import { CheckboxForm } from "./components/ui/checkbox2"
import { Button } from "./components/ui/button"
import "./FormPenyetoran.css"

const FormPenyetoran=()=>{
    return(
        <>
            <Navbar/>
            <header className="bg-white shadow">
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
                        <div>
                            {/* <h1 className="card-title">Your last savings</h1> */}
                            <p className="card-description"> *Your last savings from March 2024</p>
                        </div>
                        <div className="form-data">
                            <div className="each-data">    
                                <p>Price</p>
                                <h1>Rp 150.000</h1>
                            </div>
                            <div className="each-data">    
                                <p>Trash Weight</p>
                                <h1>3Kg</h1>
                            </div>
                            <div className="status">

                            </div>
                        </div>
                        <div className="bank">
                            <p>Bank or E-Wallet</p>
                            <SelectBank/>
                        </div>
                        <div className="rekening">
                            <p>No. Rekening or No. E-Wallet</p>
                            <Input/>
                        </div>
                        <div className="validation-check">
                            <CheckboxForm/>
                        </div>
                        <Button className="form-button">Submit</Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default FormPenyetoran