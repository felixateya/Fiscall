import React from "react";
import Sidebar from "../Components/Sidebar";

function Profile() {
  return (
    <div className="Profile">
      <Sidebar />
      <div className="prof">
      <h1>My Profile</h1>
      <div className="prfl">
        <div className="img">
          <h2>Personal Information</h2>
          <p><span>Name:</span> John Doe</p>
          <p><span>Address:</span> 123 Main Street, City, Country</p>
          <p><span>Contact Number:</span> 555-123-4567</p>
        </div>
        <div className="name">
          <h2>Account Information</h2>
          <p><span>Bank Account:</span> XXXX-XXXX-XXXX-1234</p>
          <p><span>Credit Card:</span> XXXX-XXXX-XXXX-5678</p>
          <p><span>Investment Account:</span> XXXX-XXXX-XXXX-9012</p>
        </div>
        <button className="edit">Edit Profile</button>
      </div>
      </div>
      
    </div>
  );
}

export default Profile;
