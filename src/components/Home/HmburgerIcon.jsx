import React, { useRef, useState } from "react";
import { checkDisplay , setDisplay } from "../../utils/handleSidebar";

const HamburgerIcon = () => {
  
  const handleSidebar = () => {

    
    let sidebar = document.querySelector(".sidebar");
    let dynamicView = document.querySelector(".dynamic-view");
    if (checkDisplay()) {
   
        gsap.to(sidebar,{
            x:"-100%",
        
         })
        
        
      dynamicView.style.justifyContent = "center";

    } else {
        gsap.to(sidebar,{
            x:"0",
         })
      dynamicView.style.justifyContent = "flex-end";
    }
    setDisplay();
  };


  
  return (
    <div className="hamburger-icon" onClick={handleSidebar}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default HamburgerIcon;
