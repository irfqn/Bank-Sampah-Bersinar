import Sidebar from "./components/ui/sidebar"
import { Card } from "./components/ui/card"
import { RequestTable } from "./components/ui/requestTable"
import "./adminPenyetoran.css"

const AdminPenyetoran=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <PenyetoranMain/>
        </div>
    )
}

const PenyetoranMain=()=>{
    return(
        <div className="h-screen flex-1 p-7 penyetoran-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Penyetoran Nasabah</h1>
            <main className="penyetoran-container">
                    <Card className="penyetoran-card">
                        <RequestTable/>
                    </Card>
            </main>
        </div>
    )
}

export default AdminPenyetoran