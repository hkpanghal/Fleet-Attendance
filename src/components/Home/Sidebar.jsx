import React, { useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import { setDisplay } from "../../utils/handleSidebar";
import image from '../../assets/applogo.png'
import './Sidebar.css'

const activeStyle = {
  border: '2px solid white', 
  background:"rebeccapurple"
};


function Sidebar() {


  const comp = useRef(null)

  useEffect(() => {
    if(comp.current){
      const t = gsap.timeline()
      t.from(".nli-anim",{
        opacity:0,
        scale:0.5,
        duration:0.2,
        delay:0.2,
        stagger:0.2,
      })
    }
  },[useRef])
  const handleSidebar = () => {

    
    let sidebar = document.querySelector(".sidebar");
    let dynamicView = document.querySelector(".dynamic-view");
    gsap.to(sidebar,{x:"-100%"}) 
    dynamicView.style.justifyContent = "center";
    setDisplay();
  };

  return (
    <div className="main sidebar-main sidebar" ref={comp}>
      <div className="sidebar-upper-part">
        <div className="sidebar-upper-part-arrow nli-anim" onClick={handleSidebar}>
        «
        </div>
        <div className="sidebar-upper-part-logo">
          <img src={image} alt="" />
        </div>
        <h3>Fleet Attendance</h3>
      </div>

      <div className="sidebar-lower-part">
        <ol>
          <li className="nli-anim"><NavLink className="navLink" to={`/`} style={({isActive}) => isActive? activeStyle: {background:"#123"}  }>Classes</NavLink></li>
          <li className="nli-anim" ><NavLink className="navLink" to={`/History`} style={({isActive}) => isActive? activeStyle: {background:"#123"}  }>History</NavLink></li>
          <li className="nli-anim"><NavLink className="navLink" to={`/Profile`} style={({isActive}) => isActive? activeStyle: {background:"#123"} }>Profile</NavLink></li>
          <li className="nli-anim"><NavLink className="navLink" to={`/Logout`}   style={({isActive}) => isActive? activeStyle: {background:"#123"} }>Log out</NavLink></li>
        </ol>
       
      </div>
    </div>
  );
}

export default Sidebar;
