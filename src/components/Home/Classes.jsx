import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Classes.css";
import { AddClassesPopUp } from "./AddClassesPopUp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import addClassImage from "../../assets/addClass.jpg";
import Helper from "./Helper.jsx";
import { fetchClasses } from "../../Slices/classesSlice.js";
import ClassItem from "./ClassItem.jsx";
import Loader from "./Loader.jsx";



export default function Classes() {

  const dispatch = useDispatch();
  const [displayAddClassesPopUp, setisplayAddClassesPopUp] = useState(true);
  const Classes = useSelector((state) => state.class.classes);
  const isLoading = useSelector((state) => state.class.isLoading)
  const userDetails = useSelector((state) => state.user.details);
 
  const comp = useRef(null)

  useEffect(() => {
    if(comp.current){
      const t = gsap.timeline()
      t.from(".cli-anim",{
        duration:0.5,
        delay:0.2,
        opacity:0,
        scale:0.5,
        stagger:0.2
      })
    }

  },[isLoading])

  useEffect(() => {
    dispatch(fetchClasses(userDetails._id));
  },[]);

 
if(isLoading){
  return <div></div>
}

  return (
    <div className="classes dynamic" ref={comp}>
      <AddClassesPopUp
        displayMode={displayAddClassesPopUp === true ? "none" : "block"}
        setisplayAddClassesPopUp={setisplayAddClassesPopUp}
      />
      <div className="add-search-container">
        <label htmlFor="" className="cli-anim">
          <input type="text" placeholder="🔍Search Class" />
        </label>

        <button
        className="cli-anim"
          onClick={() => setisplayAddClassesPopUp(!displayAddClassesPopUp)}
        >
          ➕
        </button>
      </div>
      <ol>
        {Classes.length ? (
          Classes.map((elem) => (
            <li key={elem._id} className="cli-anim" >
              <ClassItem elem={elem} />
            </li>
          ))
        ) : (
          <Helper name={"Classes"} src={addClassImage} />
        )}
      </ol>
    </div>
  );
}
