import React from "react";
import Sidebar from "../Components/Sidebar";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="Viewplane">
        <h1>Dashboard</h1>
        <h2>Overview</h2>
        <div className="Top">
     
          <div className="left">

          </div>
          <div className="mid">

          </div>
          <div className="right">

          </div>
        </div>
        <h2>Income and Expenses</h2>
        <div className="Bottom">
          <div className="left2">

          </div>
          <div className="right2">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
