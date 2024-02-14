import React, { useState, useEffect } from "react";
import "./Classes.css";
import { AddClassesPopUp } from "./AddClassesPopUp";
import { useNavigate } from "react-router-dom";
import { userDetails } from "./userdetails.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteClass } from "../../Slices/classesSlice.js";
import { deleteStudentsWhenClassIsDeleted } from "../../Slices/studentsSlice.js";
import addClassImage from "../../assets/addClass.jpg"
// import { database } from
import "../../appwrite/database.js";
import { getClasses } from "../../appwrite/database.js";
import { renameClass, setContentEditable } from "../../Slices/classesSlice.js";
import Helper from "./Helper.jsx";
export default function Classes() {
  // const [classes,setClasses] = useState([])
  const [displayAddClassesPopUp, setisplayAddClassesPopUp] = useState(true);
  const [rename, setRename] = useState("");
  const Classes = useSelector((state) => state.class.classes);
  const dispatch = useDispatch();

  // useEffect(()=>{

  //   const classes = JSON.parse(localStorage.getItem("class"))
  //   getClasses(userDetails.id).then(function(res){setClasses([...res.documents])},function(error){error})

  //  },[])

  //  useEffect(()=>{
  //    localStorage.setItem("class", JSON.stringify(classes))

  //  },[classes])

  const navigate = useNavigate();

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
        { Classes.length? Classes.map((elem) => (
          <li key={elem.id}>
            <div className="class-section">
            <input
                  type="text"
                  readOnly={!elem.contentEditable}
                  onChange={(e) => setRename(e.target.value)}
                  value={elem.contentEditable === false ? elem.name : rename}
                  placeholder="enter name and save"
                />
              <div className="btns">
                <button
                  className="rename-btn"
                  onClick={() =>
                    elem.contentEditable === false
                      ? dispatch(
                          setContentEditable({
                            id: elem.id,
                            contentEditable: true,
                          })
                        )
                      : (dispatch(renameClass({ id: elem.id, name: rename })),
                        dispatch(
                          setContentEditable({
                            id: elem.id,
                            contentEditable: false,
                          })
                        ),setRename(""))
                  }
                >
                  {elem.contentEditable === true ? "📂" : "✏️"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirm("Are you Sure") === true?(dispatch(deleteClass(elem.id)),(dispatch(deleteStudentsWhenClassIsDeleted({cid:elem.id})))):""}
                >
                  ❌
                </button>
              </div>
            </div>
            <div
              className="students-section"
              onClick={() => navigate(`/Home/Students/:Students/:${elem.id}/:${elem.name}`)}
            >
              <p className="st-logo">🧑‍🎓⟫ </p>
              <p style={{fontSize:"x-small"}}>Total : {elem.students.length}</p>
            </div>
          </li>
        )):<Helper name={"Classes"} src={addClassImage}/>}
      </ol>
    </div>
  );
}
