import React, { useState } from "react";
import "./StudentPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../Slices/studentsSlice";
import { useParams } from "react-router-dom";
import { addelemStudentArray } from "../../Slices/classesSlice";
import { addStudentToDb } from "../../backend/backend";


function StudentPopUp({ stpopup, setStpopup }) {
  const { class_id } = useParams();
  const [customError, setCustomError] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [roll_number, setRoll_number] = useState("");
  const userDetails = useSelector((state) => state.user.details)
  const dispatch = useDispatch();
  const [loading,setIsLoading] = useState(false)
  function adMoreStudent() {
   
    setIsLoading(true);

    addStudentToDb(
      class_id,
      userDetails._id,
      first_name,
      last_name,
      roll_number
    )
      .then((res) => {
        if (res.data.success) {
          dispatch(addStudent({ data: res.data.student }));
          dispatch(
            addelemStudentArray({
              class_id: res.data.student.class_belongs,
              student_id: res.data.student._id,
            })
          );
          setIsLoading(false);
          setFirst_name("");
          setLast_name("");
          setRoll_number("");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert("some error occurred while creating the student")
        console.log(err);
      });
  }
  return (
    <div
      className="spopup-conatiner"
      style={stpopup === true ? { display: "flex" } : { display: "none" }}
    >
      <button className="removebtn" onClick={() => setStpopup(false)}>
        ❌
      </button>
      <input
        type="text"
        placeholder="enter first name"
        onChange={(e) =>
          setFirst_name(e.target.value)
        }
        value={first_name}
      />
      <input
        type="text"
        placeholder="enter last name"
        onChange={(e) =>
          setLast_name(e.target.value)
        }
        value={last_name}
      />
      <input
        type="text"
        placeholder="enter roll number"
        onChange={(e) =>
          setRoll_number(e.target.value)
        }
        value={roll_number}
      />
      <button
        className="addbtn"
        onClick={() =>
          first_name && roll_number
            ? (adMoreStudent(), setCustomError(""))
            : first_name
            ? setCustomError("missing roll number field")
            : setCustomError("missing first_name field")
        }
      >
        Add
      </button>

      <p>{customError}</p>
    </div>
  );
}

export default StudentPopUp;
