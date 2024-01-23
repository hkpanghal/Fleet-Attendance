import React from "react";
import "./AddClassesPopUp.css";
export const AddClassesPopUp = ({ displayMode, setisplayAddClassesPopUp}) => {
  return (
    <>
       
      <div className="add-classes" style={{ display: displayMode }}>
      <button className="remove-pop-up" onClick={() => setisplayAddClassesPopUp((prev)=>!prev)}>
        ❌
       </button>
        AddClassesPopUp
      </div>
    </>
  );
};
