import React, { useEffect, useState } from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { RingLoader } from "react-spinners";
import { getCurrentUser } from "../../appwrite/auth";
import { Provider } from 'react-redux'
import { store } from "../../Store/store.js";
import Classes from "./Classes.jsx";
function Home() {

  const [user,setUser] = useState(null)
  const [loader,setLoader] = useState(false)

  return (
    <>
    <Provider store={store}>


    <div className="loader" style={{visibility:loader===true?"visible":"hidden"}}> <RingLoader /></div>
      <div className="main home-main">
        <Topbar />
        <div className="home-main-container">

            <Sidebar />
            <div className="screen dynamic-view">
               <Outlet/>
            </div>
            
        </div>
      </div>
 
      </Provider>
    </>
  );
}

export default Home;
