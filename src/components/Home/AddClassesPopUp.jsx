import React, { useState } from "react";
import "./AddClassesPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { addClass } from "../../Slices/classesSlice";
import { addClassToDb } from "../../backend/backend";

export const AddClassesPopUp = ({
  displayMode,
  setisplayAddClassesPopUp,
}) => {
  const [customError, setCustomError] = useState("");
  const [class_name, setClass_name] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.details)

  const handleAddClass = () => {
   
    setisplayAddClassesPopUp(false);
    setIsLoading(true);
    addClassToDb(class_name.trim(), userDetails._id)
      .then((res) => {
        if (res.data.success) {
          dispatch(addClass({ data: res.data.clas }));
          setIsLoading(false);
          alert("class created successfully",)
          setClass_name("");
        }
      })
      .catch((error) => {
        console.log(error), setIsLoading(false);
        alert("some error occurred")
      });
  };


  return (
    <>
      <div className="add-classes" style={{ display: displayMode }}>
        <button
          className="remove-pop-up"
          onClick={() => setisplayAddClassesPopUp((prev) => !prev)}
        >
          ❌
        </button>
        <div className="add-class-box">
          <input
            type="text"
            className="input-add-class"
            placeholder="Enter class_name here"
            value={class_name}
            onChange={(e) =>
              setClass_name(e.target.value)
            }
          />
          <button
            className="add-class-btn"
            onClick={(e) =>
              class_name
                ? (handleAddClass(), setCustomError(""))
                : setCustomError("missing class_name")
            }
          >
            Add
          </button>
          <p>{customError}</p>
        </div>
      </div>
    </>
  );
};
