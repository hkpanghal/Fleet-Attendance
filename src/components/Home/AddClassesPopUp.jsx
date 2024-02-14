import React, { useState ,useEffect} from "react";
import "./AddClassesPopUp.css";
import { v4 as uuidv4 } from "uuid";
import { ID } from "appwrite";
import { useDispatch } from "react-redux";
import { addClass as add } from "../../Slices/classesSlice";
import { userDetails } from "./userdetails"
import { createClass } from "../../appwrite/database";
export const AddClassesPopUp = ({ displayMode, setisplayAddClassesPopUp ,setClasses}) => {

  const [customError,setCustomError] = useState("");
  const [classData,setClassData] = useState({
    id: uuidv4(),
    name:"",
    students: [],
    dateCreated:Date(Date.now()).toLocaleString(),
    userid:userDetails.id,
  })
  const dispatch = useDispatch() 
  async function addClass(){

    // if( await createClass(classData) === true){
    //   console.log("hello")
    //   setClasses((prev) => [...prev,classData]);
   
    //   setisplayAddClassesPopUp((prev)=>!prev);
   
    // }
    // else{
    //   console.log("bye")
    // }

    dispatch(add(classData))
    setClassData({ 
     id: uuidv4(),
    name:"",
    students: [],
    dateCreated:Date(Date.now()).toLocaleString(),
    userid:userDetails.id,})
    setisplayAddClassesPopUp((prev) => !prev)
  }
  return (
    <>
       
      <div className="add-classes" style={{ display: displayMode }}>
      <button className="remove-pop-up" onClick={() => setisplayAddClassesPopUp((prev)=>!prev)}>
        ❌
       </button>
        <div className="add-class-box">
        <input type="text" className="input-add-class"  placeholder="Enter Classname here" value={classData.name} onChange={(e) => setClassData((prev) => ({...prev,name:e.target.value})) }/>
        <button className="add-class-btn" onClick={(e) => classData.name?(addClass(),setCustomError("")):setCustomError("missing classname")}>Add</button>
        <p>{customError}</p>
        </div>
      </div>
    </>
  );
};
