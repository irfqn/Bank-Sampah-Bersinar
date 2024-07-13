// import Navbar from "./components/ui/Navbar"
// import { Card } from "./components/ui/card"
// import { Button } from "./components/ui/button"
// import "./UserProfile.css"

// const Profile=()=>{
//     return(
//         <>
//             <Navbar/>
//             <header className="bg-white shadow">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
//                 </div>
//             </header>
//             <div className="profile-content">
//                 <Card className="profile-card shadow-lg">
//                     <div className="profile-image">
//                         <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" className="user-profile-img" />
//                     </div>
//                     <div className="data-profile">
//                         <div className="data-header">
//                             <h1 className="user-name">Users Name</h1>
//                             <p>user@gmail.com</p>
//                         </div>
//                         <div className="data-content">
//                             <div>
//                                 <p className="data-label">Age</p>
//                                 <h1 className="data">22</h1>
//                             </div>
//                             <div>
//                                 <p className="data-label">Birth Place</p>
//                                 <h1 className="data">Bandung</h1>
//                             </div>
//                             <div>
//                                 <p className="data-label">Birth Date</p>
//                                 <h1 className="data">27, Desember 2001</h1>
//                             </div>
//                             <div>
//                                 <p className="data-label">Whatsapp Number</p>
//                                 <h1 className="data">0818027*****</h1>
//                             </div>
//                             <div>
//                                 <p className="data-label">NIK</p>
//                                 <h1 className="data">32760********</h1>
//                             </div>
//                             <div>
//                                 <p className="data-label">Address</p>
//                                 <h1 className="data address">Jl. Merdeka No. 123, Kelurahan Cipedes, Kecamatan Cimahi Selatan, Kota Cimahi, Jawa Barat</h1>
//                                 {/* <h1 className="data">lorem5</h1> */}
//                             </div>
//                         </div>
//                         <Button className="edit-profile">Edit Profile</Button>
//                         <Button className="sign-out">Sign Out</Button>
//                     </div>
//                 </Card>
//             </div>
//         </>
//     )
// }

// export default Profile

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"
import "./UserProfile.css"

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getCookie("token"); // Mengambil token dari cookie
        console.log(token)
        const response = await fetch("https://bank-sampah-bersinar.azurewebsites.net/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menambahkan token ke header untuk otorisasi
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUserData(data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fungsi untuk mengambil nilai cookie berdasarkan namanya
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

    // Fungsi untuk menghitung umur dari tanggal lahir
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
        </div>
      </header>
      <div className="profile-content">
        <div className="profile-card shadow-lg">
          {userData ? (
            <Card className="data-profile">
              <div className="data-header">
                <h1 className="user-name">{userData.firstName} {userData.lastName}</h1>
                <p>{userData.email}</p>
              </div>
              <div className="data-content">
                <div>
                  <p className="data-label">Age</p>
                  <h1 className="data">{calculateAge(userData.birthDate)}</h1>
                </div>
                <div>
                  <p className="data-label">Birth Place</p>
                  <h1 className="data">{userData.birthPlace}</h1>
                </div>
                <div>
                  <p className="data-label">Birth Date</p>
                  <h1 className="data">{userData.birthDate}</h1>
                </div>
                <div>
                  <p className="data-label">Whatsapp Number</p>
                  <h1 className="data">{userData.phone}</h1>
                </div>
                <div>
                  <p className="data-label">NIK</p>
                  <h1 className="data">{userData.nik}</h1>
                </div>
                <div>
                  <p className="data-label">Address</p>
                  <h1 className="data address">{userData.address}</h1>
                </div>
              </div>
              {/* <Button className="edit-profile">Edit Profile</Button> */}
              <Button className="sign-out">Sign Out</Button>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
