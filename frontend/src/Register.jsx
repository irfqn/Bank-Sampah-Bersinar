// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { WavyBackground } from "./components/ui/wavy-background";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import "./Register.css"

// const Register=()=>{
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
    
//     const handleRegister=()=>{
    
//         try {
//             fetch("http://localhost:3000/api/user/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 // Handle response from backend
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.error("Error:", error.message);
//             });
//         } catch (error) {
//             console.error("Error:", error.message);
//         }
//     }

//     return(
//         <WavyBackground>
//             <Header/>
//             <div className="content">
//                 <RegisterContent 
//                     email={email}
//                     setEmail={setEmail}
//                     password={password}
//                     setPassword={setPassword}
//                     handleLogin={handleRegister}/>
//             </div>
//         </WavyBackground>
//     )
// }



// const Header = () => {
//     return <img src={bankBersinarLogo} className="logo" />;
//   };

// // eslint-disable-next-line react/prop-types
// const RegisterContent=({ email, setEmail, password, setPassword, handleRegister })=>{
//     const navigate=useNavigate()

//     return(
//     <Card className="w-[350px] card">
//       <CardHeader>
//         <CardTitle>Register Account</CardTitle>
//         <CardDescription>Dont have an account? Register your account</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4 cardContent">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="email">Email</Label>
//               <Input 
//               id="email"
//               type="email" 
//               value={email}  
//               onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
//             </div>
//           </div>
//           <div className="grid w-full items-center gap-4 cardContent">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Password</Label>
//               <Input 
//               id="name" 
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)} />
//             </div>
//           </div>
//         </form>
//         <CardDescription>Already have an account? <span className="font-bold loginButton" onClick={()=>navigate("/login")}>Login Now!</span></CardDescription>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button className="button" onClick={handleRegister}>Regist</Button>
//       </CardFooter>
//     </Card>
//     )
// }

// export default Register

// import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { WavyBackground } from "./components/ui/wavy-background";
// import "./Login2.css";

// const Login2 = () => {
//   return (
//     <WavyBackground>
//       <Header />
//       <div className="content">
//         <Content />
//       </div>
//     </WavyBackground>
//   );
// };

// const Header = () => {
//   return <img src={bankBersinarLogo} className="logo" />;
// };

// const Content = () => {
//   return (
//     <Card className="w-[350px] card">
//       <CardHeader>
//         <CardTitle className="cardTitle">Log in to Your Account</CardTitle>
//         <CardDescription>Welcome back! select method to login</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="space-y-1">
//           <Label htmlFor="name">Email</Label>
//           <Input id="name" type="email" />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="username">Password</Label>
//           <Input id="username" type="password" />
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="button">Login</Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Login2;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "./components/ui/wavy-background";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <WavyBackground>
      <div className="container">
        <Header />
        <div className="content">
          <Content 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleRegister={handleRegister}
          />
        </div>
      </div>
    </WavyBackground>
  );
};

const Header = () => {
  return <img src={bankBersinarLogo} className="logo" />;
};

// eslint-disable-next-line react/prop-types
const Content = ({ email, setEmail, password, setPassword, handleRegister }) => {
  const navigate=useNavigate()

  return (
    <Card className="w-[350px] card">
      <CardHeader>
        <CardTitle className="cardTitle">Register Account</CardTitle>
        <CardDescription>Welcome back! select method to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
          />
        </div>
        <CardDescription>Dont have an account? <span className="font-bold registerButton" onClick={()=>navigate("/login")}>Login Now!</span></CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="button" onClick={handleRegister}>Regist</Button>
      </CardFooter>
    </Card>
  );
};

export default Register;

