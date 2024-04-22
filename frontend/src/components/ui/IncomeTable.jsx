import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const income = [
    {
        id:"1",
        nama: "budi",
        tanggal: "2024-03-15",
        bank: "Credit Card",
        rekening: "121212", // Tidak ada nomor rekening karena pembayaran dilakukan dengan kartu kredit
        status: "sudah", // Karena status pembayaran adalah "Paid"
        kunjungan: 1, // Satu pengunjung datang untuk pembayaran ini
    },
    {
        id:"2",
        nama: "zahwan",
        tanggal: "2024-03-20",
        bank: "PayPal",
        rekening: "21212121", // Tidak ada nomor rekening karena pembayaran dilakukan melalui PayPal
        status: "belum", // Karena status pembayaran adalah "Pending"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    {
        id:"3",
        nama: "tama",
        tanggal: "2024-03-25",
        bank: "Bank Transfer",
        rekening: "12121212", // Nomor rekening untuk transfer bank
        status: "belum", // Karena status pembayaran adalah "Unpaid"
        kunjungan: 0, // Belum ada kunjungan untuk pembayaran ini
    },
    // Lanjutkan untuk semua objek di array 'nasabahs'
];



  
const IncomeTable=()=> {
    return (
      <Table>
        <TableCaption>List of customer deposits</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">nasabah</TableHead>
            <TableHead>tanggal</TableHead>
            <TableHead>bank</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
            <TableHead>rekening</TableHead>
            <TableHead>status</TableHead>
            <TableHead>kunjungan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {income.map((nasabah) => (
            <TableRow key={nasabah.id}>
              <TableCell className="font-medium">{nasabah.nama}</TableCell>
              <TableCell>{nasabah.tanggal}</TableCell>
              <TableCell>{nasabah.bank}</TableCell>
              {/* <TableCell className="text-right">{nasabah.totalAmount}</TableCell> */}
              <TableCell>{nasabah.rekening}</TableCell>
              <TableCell>{nasabah.status}</TableCell>
              <TableCell>{nasabah.kunjungan}</TableCell>
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



export default IncomeTable
  