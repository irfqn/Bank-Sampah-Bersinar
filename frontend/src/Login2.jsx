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
import "./Login2.css";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateForm()) {
      fetch("http://localhost:3000/api/user/login", {
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
          const token = data.token;
          document.cookie = `token=${token}; Secure; SameSite=None;`;
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
            errorMessage={errorMessage}
            handleLogin={handleLogin}
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
const Content = ({ email, setEmail, password, setPassword, errorMessage ,handleLogin }) => {
  const navigate=useNavigate()

  return (
    <Card className="w-[350px] card">
      <CardHeader>
        <CardTitle className="cardTitle">Log in to Your Account</CardTitle>
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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <CardDescription>Dont have an account? <span className="font-bold registerButton" onClick={()=>navigate("/register2")}>Register Now!</span></CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="button" onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default Login2;

// Import useState dan useEffect dari React
// eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { WavyBackground } from "./components/ui/wavy-background";
// import { useNavigate } from "react-router-dom";
// import "./Login2.css";

// const Login2 = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate(); 

//   // Fungsi untuk memeriksa apakah email dan password sudah diisi
//   const validateForm = () => {
//     if (!email.trim() || !password.trim()) {
//       setErrorMessage("Please fill in all fields.");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = () => {
//     if (validateForm()) {
//       fetch("http://localhost:3000/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Invalid email or password");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           if (!data || !data.token) {
//             throw new Error("Invalid data received from server");
//           }
//           const token = data.token;
//           document.cookie = `token=${token}; Secure; SameSite=None;`;
//           navigate("/dashboard");
//         })
//         .catch((error) => {
//           setErrorMessage(error.message);
//         });
//     }
//   };
  

//   return (
//     <WavyBackground>
//       <div className="container">
//         <Header />
//         <div className="content">
//           <Content 
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             errorMessage={errorMessage}
//             handleLogin={handleLogin}
//           />
//         </div>
//       </div>
//     </WavyBackground>
//   );
// };

// const Header = () => {
//   return <img src={bankBersinarLogo} className="logo" />;
// };

// // eslint-disable-next-line react/prop-types
// const Content = ({ email, setEmail, password, setPassword, errorMessage, handleLogin }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-[350px] card">
//       <CardHeader>
//         <CardTitle className="cardTitle">Log in to Your Account</CardTitle>
//         <CardDescription>Welcome back! select method to login</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="space-y-1">
//           <Label htmlFor="email">Email</Label>
//           <Input 
//             id="email" 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email" 
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="password">Password</Label>
//           <Input 
//             id="password" 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             placeholder="Password"
//           />
//         </div>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         <CardDescription>Dont have an account? <span className="font-bold registerButton" onClick={() => navigate("/register2")}>Register Now!</span></CardDescription>
//       </CardContent>
//       <CardFooter>
//         <Button className="button" onClick={handleLogin}>Login</Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Login2;

// eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { WavyBackground } from "./components/ui/wavy-background";
// import { useNavigate } from "react-router-dom";
// import "./Login2.css";

// const Login2 = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate(); 

//   const handleLogin = () => {
//     if (!email.trim() || !password.trim()) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }

//     fetch("http://localhost:3000/api/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Invalid email or password");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data)
//         if (!data || !data.token || !data.userId) {
//           throw new Error("Invalid data received from server");
//         }
//         const token = data.token;
//         const userId = data.userId;
//         document.cookie = `token=${token}; Secure; SameSite=None;`;
//         navigate("/dashboard", { state: { userId } }); // Mengirim userId ke halaman berikutnya
//       })
//       .catch((error) => {
//         setErrorMessage(error.message);
//       });
//   };

//   return (
//     <WavyBackground>
//       <div className="container">
//         <Header />
//         <div className="content">
//           <Content 
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             errorMessage={errorMessage}
//             handleLogin={handleLogin}
//           />
//         </div>
//       </div>
//     </WavyBackground>
//   );
// };

// const Header = () => {
//   return <img src={bankBersinarLogo} className="logo" alt="Bank Bersinar Logo" />;
// };

// // eslint-disable-next-line react/prop-types
// const Content = ({ email, setEmail, password, setPassword, errorMessage, handleLogin }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-[350px] card">
//       <CardHeader>
//         <CardTitle className="cardTitle">Log in to Your Account</CardTitle>
//         <CardDescription>Welcome back! Select a method to login</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="space-y-1">
//           <Label htmlFor="email">Email</Label>
//           <Input 
//             id="email" 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email" 
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="password">Password</Label>
//           <Input 
//             id="password" 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             placeholder="Password"
//           />
//         </div>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         <CardDescription>Dont have an account? <span className="font-bold registerButton" onClick={() => navigate("/register2")}>Register Now!</span></CardDescription>
//       </CardContent>
//       <CardFooter>
//         <Button className="button" onClick={handleLogin}>Login</Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Login2;
