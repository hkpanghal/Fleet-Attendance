import React, { useState } from "react";
import { updateClassNameToDb } from "../../backend/backend";
import { renameClass } from "../../Slices/classesSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ClassItem = ({ elem }) => {
  const [contentEditable, setContentEditable] = useState(false);
  const [class_name, setClass_name] = useState(elem.class_name);
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = {
    class_id:elem._id,
    class_name:elem.class_name
  }

  const handleRenameClass = () => {
    setIsLoading(true);
    
    updateClassNameToDb(elem._id, elem.created_by, class_name.trim())
      .then((res) => {
        if (res.data.success) {
          alert("classname updated successfully")

          dispatch(renameClass({class_id: elem._id, class_name }));
          setContentEditable(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("some error occurred")
        setIsLoading(false);
      });
  };


//   if(isLoading){
//     return <><div className="class-section"><Loader /></div></>
//   }

  const handleSetEditable = () => {
    
    const isConfirmed = confirm("Don't forget to save")
    if(isConfirmed){
        setContentEditable(true)
    }

  }
  return (
    <>
      <div className="class-section">
        <input
          type="text"
          readOnly={!contentEditable}
          onChange={(e) => setClass_name(e.target.value)}
          value={class_name}
          placeholder="enter name and save"
          style={contentEditable ? {border:"2px solid red"} :{}}
        />
        <div className="btns">
          <button
            className="rename-btn"
            onClick={() => contentEditable ? handleRenameClass() : handleSetEditable() }
          >
            {contentEditable === true ? "📂" : "✏️"}
          </button>
          {/* <button
            className="delete-btn"
            onClick={() =>
              confirm("Are you Sure") === true
                ? (dispatch(deleteClass(elem.id)),
                  dispatch(deleteStudentsWhenClassIsDeleted({ cid: elem._id })))
                : ""
            }
          >
            ❌
          </button> */}
        </div>
      </div>
      <div
        className="students-section"
        onClick={() => navigate(`/Students/${elem._id}/${elem.class_name}`)}
      >
        <p className="st-logo">🧑‍🎓⟫ </p>
        <p style={{ fontSize: "x-small" }}>Total : {elem.students.length}</p>
      </div>
    </>
  );
};

export default ClassItem;
