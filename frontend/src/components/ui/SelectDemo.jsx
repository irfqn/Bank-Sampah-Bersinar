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

export function SelectDemo() {
  return (
    <Select className="bg-white">
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select trash" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Trash</SelectLabel>
          <SelectItem value="apple">P1</SelectItem>
          <SelectItem value="banana">P2</SelectItem>
          <SelectItem value="blueberry">P3</SelectItem>
          <SelectItem value="grapes">P4</SelectItem>
          <SelectItem value="pineapple">P5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

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
  )
}
