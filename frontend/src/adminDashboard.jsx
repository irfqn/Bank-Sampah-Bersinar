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
