import React, { useState } from "react";

const HamburgerIcon = () => {
  // console.log(window.innerWidth);
  const [displaySidebar, setDisplaySidebar] = useState(window.innerWidth <= 700?false:true);
  const handleSidebar = () => {
    let sidebar = document.querySelector(".sidebar");
    let dynamicView = document.querySelector(".dynamic-view");
    if (displaySidebar) {
   
        gsap.to(sidebar,{
            x:"-100%",
        
         })
        
        
      dynamicView.style.justifyContent = "center";
      setDisplaySidebar(false);
    } else {
        gsap.to(sidebar,{
            x:"0",
         })
      dynamicView.style.justifyContent = "flex-end";
      setDisplaySidebar(true);
    }
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
