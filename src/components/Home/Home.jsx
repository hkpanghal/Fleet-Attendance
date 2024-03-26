import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet} from 'react-router-dom'


function Home() {

 
  return (
    <>

      <div className="main home-main">
        <Topbar />
        <div className="home-main-container">

            <Sidebar />
            <div className="screen dynamic-view">
               <Outlet/>
            </div>
            
        </div>
      </div>

    </>
  );
}

export default Home;
