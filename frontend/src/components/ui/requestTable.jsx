import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
  } from "@/components/ui/table"
import { Button } from "./button"
  
  const request = [
    {
        id:1,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
    {
        id:2,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
    {
        id:3,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
    {
        id:4,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
    {
        id:5,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
    {
        id:6,
        name: "John Doe",
        noRekening: 1234567890,
        nik: "1234567890123456",
        nominal: 100.000,
    },
  ]
  
  export function RequestTable() {
    return (
        <Table>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>No Rekening</TableHead>
                    <TableHead>NIK</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {request.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.noRekening}</TableCell>
                        <TableCell>{request.nik}</TableCell>
                        <TableCell>{request.nominal}</TableCell>
                        <TableCell>
                            <Button style={{ backgroundColor: 'green', marginRight: '5px' , color:"white"}}>Terima</Button> {/* Tombol 'Ya' */}
                            <Button style={{ backgroundColor:"red" , color:"white"}}>Tolak</Button> {/* Tombol 'Tidak' */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total dana sekarang</TableCell>
                    <TableCell className="text-right">Rp 1.000.000</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
  }
  