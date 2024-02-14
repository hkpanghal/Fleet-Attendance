import React, { useState } from "react";
import { useNavigate ,NavLink} from "react-router-dom";
import { setDisplay } from "./handleSidebar";
import image from '../../assets/applogo.png'
import './Sidebar.css'
function Sidebar() {
  const navigate = useNavigate()
  const activeStyle = {
    border: '2px solid white', 
    background:"rebeccapurple"
  };

  const handleSidebar = () => {

    
    let sidebar = document.querySelector(".sidebar");
    let dynamicView = document.querySelector(".dynamic-view");
    gsap.to(sidebar,{x:"-100%"}) 
    dynamicView.style.justifyContent = "center";
    setDisplay();
  };

  return (
    <div className="main sidebar-main sidebar">
      <div className="sidebar-upper-part">
        <div className="sidebar-upper-part-arrow" onClick={handleSidebar}>
        «
        </div>
        <div className="sidebar-upper-part-logo">
          <img src={image} alt="" />
        </div>
        <h3>Fleet Attendance</h3>
      </div>

      <div className="sidebar-lower-part">
        <ol>
          <li ><NavLink className="navLink" to={`/Home/Classes/:${'Classes'}`} style={({isActive}) => isActive? activeStyle: {background:"#123"}  }>Classes</NavLink></li>
          <li ><NavLink className="navLink" to={`/Home/History/:${"History"}`} style={({isActive}) => isActive? activeStyle: {background:"#123"}  }>History</NavLink></li>
          <li ><NavLink className="navLink" to={`/Home/Profile/:${"Profile"}`} style={({isActive}) => isActive? activeStyle: {background:"#123"} }>Profile</NavLink></li>
          <li ><NavLink className="navLink" to={`/Home/Logout/:${"Logout"}`}   style={({isActive}) => isActive? activeStyle: {background:"#123"} }>Log out</NavLink></li>
        </ol>
       
      </div>
    </div>
  );
}

export default Sidebar;
