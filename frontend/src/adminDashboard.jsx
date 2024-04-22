// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';

// // eslint-disable-next-line react/prop-types
// function Sidebar({ isOpen, toggle }) {
//   return (
//     <div className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white px-4 py-6 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//       <button onClick={toggle} className="absolute top-4 right-4 text-white focus:outline-none">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//       <div className="mt-10">
//         <a href="#" className="block hover:bg-blue-800 py-2 px-3 rounded">Dashboard</a>
//         <a href="#" className="block hover:bg-blue-800 py-2 px-3 rounded mt-2">Analytics</a>
//         <a href="#" className="block hover:bg-blue-800 py-2 px-3 rounded mt-2">Customers</a>
//         <a href="#" className="block hover:bg-blue-800 py-2 px-3 rounded mt-2">Settings</a>
//       </div>
//     </div>
//   );
// }

// function AdminDashboard() {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-200">
//       <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
//       <div className="flex-grow">
//         <button onClick={toggleSidebar} className="h-10 w-10 bg-blue-900 text-white fixed top-4 right-4 flex justify-center items-center focus:outline-none">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//         <div className="p-8">
//           <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//           {/* Content of your dashboard */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../src/components/ui/sidebar";
import { Card } from "./components/ui/card";
import IncomeTable from "./components/ui/IncomeTable";
import OutcomeTable from "./components/ui/OutcomeTable";
import "./adminDasboard.css"

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <AdminMain />
    </div>
  );
};


const AdminMain=()=>{
  return(
    <div className="h-screen flex-1 p-7 main-page" style={{ backgroundColor: "#FFFFFF" }}>
        <h1 className="text-2xl font-semibold ">Dashboard</h1>
        <main className="admin-container">
          <div>
            <h1 className="font-semibold">Income Table</h1>
            <Card className="dashboard-card">
              <IncomeTable/>
            </Card>
          </div>
          <div>
            <h1 className="font-semibold">Outcome Table</h1>
            <Card className="dashboard-card">
              <OutcomeTable/>
            </Card>
          </div>
        </main>
    </div>
  )
}

export default AdminDashboard;
