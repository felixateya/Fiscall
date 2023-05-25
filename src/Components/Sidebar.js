import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="Sidebar">
      <h1>Fiscall LLC</h1>
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/Profile">Profile</Link>
      <Link to="/Income">Income</Link>
      <Link to="/Expenses">Expenses</Link>
    </div>
  );
}

export default Sidebar;
