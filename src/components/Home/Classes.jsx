import React, { useState } from "react";
import "./Classes.css";
import { AddClassesPopUp } from "./AddClassesPopUp";
import { useNavigate } from "react-router-dom";
// import { getListOfCollections } from '../../appwrite/database'
export default function Classes() {
  // getListOfCollections()
  const [displayAddClassesPopUp,setisplayAddClassesPopUp] = useState(true)

  return (
    <div className="classes dynamic">
      <AddClassesPopUp displayMode={displayAddClassesPopUp === true?"none":"block"} setisplayAddClassesPopUp={setisplayAddClassesPopUp}/>
      <div className="add-search-container">
        
        <label htmlFor="">
        <input type="text" placeholder="🔍Search Class"/>
        </label>
        
        <button  onClick={() => setisplayAddClassesPopUp(!displayAddClassesPopUp) }>➕</button>
      </div>
      <ol>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
        <li>class1</li>
       
      </ol>
    </div>
  );
}
