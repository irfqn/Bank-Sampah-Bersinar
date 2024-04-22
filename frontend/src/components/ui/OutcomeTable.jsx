import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const outcome = [
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada nominal untuk pembayaran ini
    },
    {
        id:"3",
        perusahaan: "pabrik A",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        nominal: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    // Lanjutkan untuk semua objek di array 'perusahaans'
];



  
const OutcomeTable=()=> {
    return (
      <Table>
        <TableCaption>List of fund expenditures</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">perusahaan</TableHead>
            <TableHead>tanggal</TableHead>
            <TableHead>bank</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
            <TableHead>rekening</TableHead>
            <TableHead>status</TableHead>
            <TableHead>kunjungan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outcome.map((perusahaan) => (
            <TableRow key={perusahaan.id}>
              <TableCell className="font-medium">{perusahaan.perusahaan}</TableCell>
              <TableCell>{perusahaan.tanggal}</TableCell>
              <TableCell>{perusahaan.bank}</TableCell>
              {/* <TableCell className="text-right">{perusahaan.totalAmount}</TableCell> */}
              <TableCell>{perusahaan.rekening}</TableCell>
              <TableCell>{perusahaan.status}</TableCell>
              <TableCell>{perusahaan.nominal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }



export default OutcomeTable
  