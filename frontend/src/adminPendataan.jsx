import Sidebar from "./components/ui/sidebar"
import { Input } from "./components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "./components/ui/button"
import "./adminPendataan.css"

const AdminPendataan=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <PendataanMain/>
        </div>
    )
}

const PendataanMain=()=>{
    return(
        <div className="h-screen flex-1 p-7 pendataan-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Pendataan Mitra</h1>
            <p style={{marginBlock:"1rem"}}>Masukan data mitra disini!</p>
            <main className="pendataan-container">
                <div className="input-mitras">
                    <Label className="font-semibold">Nama Mitra</Label>
                    <Input type="text" placeholder="Mitra" style={{width: "300px"}}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Nominal</Label>
                    <Input type="text" placeholder="2000xxx" style={{width: "300px"}}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Tanggal</Label>
                    <Input type="date" placeholder="Mitra" style={{width: "300px"}}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Nomor Telephone</Label>
                    <Input type="phone" placeholder="081XXXXXXXXX" style={{width: "300px"}}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Alamat</Label>
                    <Input type="text" placeholder="Alamat Mitra" style={{width: "300px"}}/>
                </div>
                <div className="input-mitras">
                    <Label className="font-semibold">Email</Label>
                    <Input type="email" placeholder="Email" style={{width: "300px"}}/>
                </div>
                <Button style={{backgroundColor:"green", color:"white"}}>Submit</Button>
            </main>
        </div>
    )
}

export default AdminPendataan