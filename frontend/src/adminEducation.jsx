import Sidebar from "./components/ui/sidebar"
import { Label } from "@radix-ui/react-label"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const AdminEducation=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <EducationMain/>
        </div>
    )
}

const EducationMain=()=>{
    return(
        <div className="h-screen flex-1 p-7 education-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold ">Education Mitra</h1>
            <p style={{marginBlock:"1rem"}}>Masukan data mitra disini!</p>
            <main className="education-container">
                <div className="input-education">
                    <Label className="font-semibold">Foto</Label>
                    <Input type="file" style={{width: "300px"}}/>
                </div>
                <div className="input-education">
                    <Label className="font-semibold">Judul</Label>
                    <Input type="text" placeholder="Judul Artikel" style={{width: "300px"}}/>
                </div>
                <div className="input-education">
                    <Label className="font-semibold">Isi Artikel</Label>
                    <Textarea placeholder="Type your message here." style={{width: "600px"}}/>
                </div>
                <Button style={{backgroundColor:"green", color:"white", marginTop:"1rem"}}>Submit</Button>
            </main>
        </div>
    )
}

export default AdminEducation