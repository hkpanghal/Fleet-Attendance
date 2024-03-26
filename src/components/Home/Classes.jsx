import React, { useState, useEffect } from "react";
import "./Classes.css";
import { AddClassesPopUp } from "./AddClassesPopUp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import addClassImage from "../../assets/addClass.jpg";
import Helper from "./Helper.jsx";
import { fetchClasses } from "../../Slices/classesSlice.js";
import Loader from "./Loader.jsx";
import ClassItem from "./ClassItem.jsx";



export default function Classes() {

  const dispatch = useDispatch();
  const [displayAddClassesPopUp, setisplayAddClassesPopUp] = useState(true);
  const Classes = useSelector((state) => state.class.classes);
  const isLoading = useSelector((state) => state.class.isLoading)
  const userDetails = useSelector((state) => state.user.details);

  useEffect(() => {
    dispatch(fetchClasses(userDetails._id));
  }, []);

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="classes dynamic">
      <AddClassesPopUp
        displayMode={displayAddClassesPopUp === true ? "none" : "block"}
        setisplayAddClassesPopUp={setisplayAddClassesPopUp}
      />
      <div className="add-search-container">
        <label htmlFor="">
          <input type="text" placeholder="🔍Search Class" />
        </label>

        <button
          onClick={() => setisplayAddClassesPopUp(!displayAddClassesPopUp)}
        >
          ➕
        </button>
      </div>
      <ol>
        {Classes.length ? (
          Classes.map((elem) => (
            <li key={elem._id}>
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
