import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const price=[
    {
        id:1,
        trash:"p1",
        price: 3000
    },
    {
        id:2,
        trash:"p2",
        price: 3000
    },
    {
        id:3,
        trash:"p3",
        price: 3000
    },
    {
        id:4,
        trash:"p4",
        price: 3000
    },
    {
        id:5,
        trash:"p5",
        price: 3000
    },
    {
        id:6,
        trash:"p6",
        price: 3000
    },
]

export function TrashTable(){
    return(
        <Table>
        <TableCaption>A list of Trash Price.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>price</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {price.map((price) => (
                <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.trash}</TableCell>
                    <TableCell>{price.price}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}