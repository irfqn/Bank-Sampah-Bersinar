import Sidebar from "./components/ui/sidebar"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input"
import Webcam from "react-webcam";
import "./adminTrashDetaction.css"

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const AdminTrashDetaction=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <TrashDetactionMain/>
        </div>
    )
}

const TrashDetactionMain=()=>{
    return(
        <div className="h-screen flex-1 p-7 td-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Trash Detaction</h1>
            <main className="td-container">
            <div>
                    
                <p style={{marginBottom:"1rem"}}>Lihat harga dan jenis sampah anda disini!</p>
                </div>
                <Card className="scan-card shadow-lg">
                    <div className="td-left">
                        <Webcam
                        videoConstraints = {videoConstraints}
                        />
                    </div>
                    <div className="td-right">
                        <Input id="picture" type="file" className="input"/>
                        <Button className="bg-black text-white">Submit</Button>
                    </div>
                </Card>
            </main>
        </div>
    )
}

export default AdminTrashDetaction