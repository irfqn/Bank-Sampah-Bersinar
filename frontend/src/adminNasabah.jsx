import { NasabahTable } from "./components/ui/nasabahTable";
import Sidebar from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { CiSearch } from "react-icons/ci";
import "./adminNasabah.css"

const AdminNasabah=()=>{
    return(
        <div className="flex">
            <Sidebar />
            <NasabahMain/>
        </div>
    )
}

const NasabahMain=()=>{
    return(
        <div className="h-screen flex-1 p-7 nasabah-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Nasabah</h1>
            <main className="nasabah-container">
                {/* <h1 className="font-semibold text-center">Nasabah List</h1> */}
                <div className="flex">
                    <Input type="text" placeholder="Search..." style={{width: "200px"}}/>
                    <Button>
                        <CiSearch />
                    </Button>
                </div>
                <Card className="nasabah-card">
                    <NasabahTable/>
                </Card>
            </main>
        </div>
    )
}


export default AdminNasabah