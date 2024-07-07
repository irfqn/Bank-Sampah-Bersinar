/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// eslint-disable-next-line react/prop-types, no-unused-vars
export function SelectDemo({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange} className="bg-white">
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select trash" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Trash</SelectLabel>
          <SelectItem value="P5">P5</SelectItem>
          <SelectItem value="P7">P7</SelectItem>
          <SelectItem value="P7 - Tutup">P7 - Tutup</SelectItem>
          <SelectItem value="P12 - MIX">P12 - MIX</SelectItem>
          <SelectItem value="P12 - BM">P12 - BM</SelectItem>
          <SelectItem value="P12 - BENING">P12 - BENING</SelectItem>
          <SelectItem value="P14">P14</SelectItem>
          <SelectItem value="P1">P1</SelectItem>
          <SelectItem value="P20">P20</SelectItem>
          <SelectItem value="P21">P21</SelectItem>
          <SelectItem value="P22">P22</SelectItem>
          <SelectItem value="P23">P23</SelectItem>
          <SelectItem value="P26">P26</SelectItem>
          <SelectItem value="P29">P29</SelectItem>
          <SelectItem value="P31">P31</SelectItem>
          <SelectItem value="Lemineral">Lemineral</SelectItem>
          <SelectItem value="P34">P34</SelectItem>
          <SelectItem value="P38">P38</SelectItem>
          <SelectItem value="P39">P39</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
          <SelectItem value="BW BENING">BW BENING</SelectItem>
          <SelectItem value="Mika">Mika</SelectItem>
          <SelectItem value="Kemasan Obat">Kemasan Obat</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// export function SelectDemo({ value, onChange }) {
//   return (
//     <Select value={value} onValueChange={onChange} className="bg-white">
//       <SelectTrigger className="w-[180px] bg-white">
//         <SelectValue placeholder="Select trash" />
//       </SelectTrigger>
//       <SelectContent className="bg-white">
//         <SelectGroup>
//           <SelectLabel>Trash</SelectLabel>
//           <SelectItem value="B8-B9">B8-B9</SelectItem>
//           <SelectItem value="BW-Bening-Warna">BW-Bening-Warna</SelectItem>
//           <SelectItem value="K1-K3-K4-K5-K6-K7-Tabloid">K1-K3-K4-K5-K6-K7-Tabloid</SelectItem>
//           <SelectItem value="K2">K2</SelectItem>
//           <SelectItem value="Kemasan Obat">Kemasan Obat</SelectItem>
//           <SelectItem value="Mika">Mika</SelectItem>
//           <SelectItem value="P17-P34-P37-Kemasan">P17-P34-P37-Kemasan</SelectItem>
//           <SelectItem value="P12-Mix. BM- Bening-P14">P12-Mix. BM- Bening-P14</SelectItem>
//           <SelectItem value="P20">P20</SelectItem>
//           <SelectItem value="P21">P21</SelectItem>
//           <SelectItem value="P22-P23">P22-P23</SelectItem>
//           <SelectItem value="P31-Galon Le-mineral">P31-Galon Le-mineral</SelectItem>
//           <SelectItem value="P32">P32</SelectItem>
//           <SelectItem value="P38-P39">P38-P39</SelectItem>
//           <SelectItem value="P5">P5</SelectItem>
//           <SelectItem value="P7 - Tutup Botol-P29">P7 - Tutup Botol-P29</SelectItem>
//           <SelectItem value="Lemineral">Lemineral</SelectItem>
//           <SelectItem value="P7-P8">P7-P8</SelectItem>
//           <SelectItem value="S1-A3">S1-A3</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

export function SelectBank() {
  return (
    <Select className="bg-white">
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select bank/e-wallet" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Bank</SelectLabel>
          <SelectItem value="VA-BCA">VA BCA</SelectItem>
          <SelectItem value="BNI">BNI</SelectItem>
          <SelectItem value="Mandiri">Mandiri</SelectItem>
          <SelectItem value="Gopay">Gopay</SelectItem>
          <SelectItem value="OVO">OVO</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
