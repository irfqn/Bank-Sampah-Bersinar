/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import "./Register2.css"
// import { WavyBackground } from "./components/ui/wavy-background"
// import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png"
// import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// // import { DatePickerDemo } from "./components/ui/datepicker";
// import DatePicker from "./components/ui/datepicker2";

// const Header = () => {
//     return <img src={bankBersinarLogo} className="logo" />;
//   };

// const Content=()=>{
//     return(
//         <Card className="w-[400px] card">
//             <CardHeader>
//                 <CardTitle className="cardTitle">Register Account</CardTitle>
//                 <CardDescription>Welcome back! select method to login</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//                 <div className="isi-nama">
//                     <div>
//                         <Label>First Name</Label>
//                         <Input
//                             type="text"
//                             id="firstName"
//                         />
//                     </div>
//                     <div>
//                         <Label>Last Name</Label>
//                         <Input
//                             type="text"
//                             id="lastName"
//                         />
//                     </div>
//                 </div>
//                 <div className="lahir">
//                     <div>
//                         <Label>Birth Place</Label>
//                         <Input
//                             type="text"
//                             id="birthPlace"
//                         />
//                     </div>
//                     <div>
//                         <Label>Birth Date</Label>
//                         <DatePicker/>
//                     </div>
//                 </div>
//                 <div>
//                     <Label>Whatsapp Number</Label>
//                     <Input
//                         type="tel"
//                         id="phone"
//                     />
//                 </div>
//                 <div>
//                     <Label>NIK</Label>
//                     <Input
//                         type="text"
//                         id="nik"
//                         // maxlength="16" 
//                         required
//                     />
//                 </div>
//                 <div>
//                     <Label>Address</Label>
//                     <Input
//                         type="text"
//                         id="address"
//                     />
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <Button className="button" >Regist</Button>
//             </CardFooter>
//         </Card>
//     )
// }

// const Register2=()=>{
//     return(
//         <WavyBackground>
//             <div className="container">
//                 <Header/>
//                 <div className="content">
//                     <Content/>
//                 </div>
//             </div>
//         </WavyBackground>
//     )
// }

// export default Register2

import React, { useState } from "react";
import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "./components/ui/wavy-background";
import "./Register2.css";

const Header = () => {
  return <img src={bankBersinarLogo} className="logo" alt="Bank Bersinar Logo" />;
};

const Register2 = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthPlace: "",
    birthDate: "",
    phone: "",
    nik: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    try {
        console.log("Form Data:", formData);
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      // Handle response from backend or perform any necessary actions
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <WavyBackground>
      <div className="container">
        <Header />
        <div className="content">
          <Content formData={formData} handleChange={handleChange} handleRegister={handleRegister} />
        </div>
      </div>
    </WavyBackground>
  );
};

const Content = ({ formData, handleChange, handleRegister }) => {
  return (
    <Card className="w-[400px] card">
      <CardHeader>
        <CardTitle className="cardTitle">Register Account</CardTitle>
        <CardDescription>Welcome back! select method to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="isi-nama">
            <div>
                <Label>First Name</Label>
                <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <Label>Last Name</Label>
                <Input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
        </div>
        <div className="lahir">
            <div>
                <Label>Birth Place</Label>
                <Input type="text" id="birthPlace" value={formData.birthPlace} onChange={handleChange} />
            </div>
            <div>
                <Label>Birth Date</Label>
                <Input type="date" id="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>
        </div>
        <div>
          <Label>Whatsapp Number</Label>
          <Input type="tel" id="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <Label>NIK</Label>
          <Input type="text" id="nik" value={formData.nik} maxLength="16" required onChange={handleChange} />
        </div>
        <div>
          <Label>Address</Label>
          <Input type="text" id="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
            <Label>Email</Label>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" id="password" value={formData.password} onChange={handleChange} />
          </div>
      </CardContent>
      <CardFooter>
        <Button className="button" onClick={handleRegister}>Regist</Button>
      </CardFooter>
    </Card>
  );
};

export default Register2;
