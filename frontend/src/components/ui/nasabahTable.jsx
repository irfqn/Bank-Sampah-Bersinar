import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const customer = [
    {
        id:1,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:2,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:3,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:4,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:5,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
    {
        id:6,
        name: "John Doe",
        placeOfBirth: "New York",
        dateOfBirth: "1990-05-15",
        whatsappNumber: "+1234567890",
        nik: "1234567890123456",
        address: "123 Main Street, New York, USA",
        email: "john.doe@example.com",
    },
  ]
  
  export function NasabahTable() {
    return (
      <Table>
        <TableCaption>A list of Nasabah.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Place of Birth</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>WhatsApp Number</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customer.map((customer) => (
            <TableRow key={customer.invoice}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.placeOfBirth}</TableCell>
              <TableCell>{customer.dateOfBirth}</TableCell>
              <TableCell>{customer.whatsappNumber}</TableCell>
              <TableCell>{customer.nik}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  