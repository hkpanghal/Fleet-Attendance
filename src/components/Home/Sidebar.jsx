import React from "react";
import { useNavigate } from "react-router-dom";
import './Sidebar.css'
function Sidebar() {

  const navigate = useNavigate()
  return (
    <div className="main sidebar-main sidebar">
      <div className="sidebar-upper-part">
        <div className="sidebar-upper-part-logo">
          
        </div>
        <h3>Fleet Attendance</h3>
      </div>

      <div className="sidebar-lower-part">
        <ol>
          <li onClick={() => navigate(`/Home/:${'Classes'}`)}>Classes</li>
          <li onClick={() => navigate(`/Home/History/:${"History"}`)}>History</li>
          <li onClick={() => navigate(`/Home/Profile/:${"Profile"}`)}>Profile</li>
          <li onClick={() => navigate(`/Home/Logout/:${"Logout"}`)}>LogOut</li>
        </ol>

      </div>
    </div>
  );
}

export default Sidebar;
