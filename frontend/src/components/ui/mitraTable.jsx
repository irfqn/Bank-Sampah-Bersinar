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
  
const customer = [
    {
        id:1,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:2,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:3,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:4,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:5,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:6,
        Mitra: "John Doe",
        nominal: `Rp 2.500.000`,
        date: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
  ]
  
  export function MitraTable() {
    
    return (
      <Table>
        <TableCaption>A list of Nasabah.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Mitra</TableHead>
                <TableHead>Nominal</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Email</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {customer.map((customer) => (
                <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.Mitra}</TableCell>
                    <TableCell>{customer.nominal}</TableCell>
                    <TableCell>{customer.date}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Income</TableCell>
            <TableCell className="text-right">Rp2.500.000</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  