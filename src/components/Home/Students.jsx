import React, { useEffect, useState } from "react";
import "./Students.css";
import { getStudents } from "../../appwrite/database";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import StudentPopUp from "./StudentPopUp";
import { useParams } from "react-router-dom";
import { switchIsPresent } from "../../Slices/studentsSlice";
import { generateAttendancePDF } from "./downloadAttemdancePdf";
import addStudentImage from "../../assets/addStudent.jpg"
import { markIsPresent } from "../../Slices/studentsSlice";
import Helper from "./Helper";
import SuccessMessage from "./SuccessMessage";
import { combineSlices } from "@reduxjs/toolkit";

function Students() {
  // getStudents("6450c212-eab4-49d0-8950-d42591fee177")
const {text1,text2,text3} = useParams()
const [subject,setSubject] = useState("")
const [successMessageDisplay,setSuccessMessageDisplay] = useState("none")
const [successMessage,setSuccessMessage] = useState("")
const dispatch = useDispatch()
const [stpopup,setStpopup] = useState(false)
let students = useSelector((state) => state.student.students);
students = students.filter((student) => student.cid === text2.substring(1)).sort((a,b) => a.rollNumber - b.rollNumber)

function calculateIsPresent(){
  
  return students.filter((student) => student.isPresent !== false ).length
}
// console.log(students,text2.substring(1))

const [selectedStudent, setSelectedStudent] = useState(null);
const handleKeyPress = (event) => {
    const { key } = event;

    // Handle key presses (e.g., arrow up and arrow down)
    // event.preventDefault();
    console.log(key)
    
    if (students.length && (key === 'w' || key === 'a') ) {
      
      // Move selection up
      
      setSelectedStudent((prev) => (prev > 1 ? prev - 1 : prev));
      
    } else if (students.length && (key === 's' || key === 'd')) {
      // Move selection down
      setSelectedStudent((prev) => (prev < students.length ? prev + 1 : prev));
    }
    else if(students.length && (key === "Enter")){
     
     if(selectedStudent){
     
     const sid = students[selectedStudent-1].id;
     const isPresent = !(students[selectedStudent-1].isPresent)  
      dispatch(markIsPresent({sid:sid,isPresent:isPresent}))
     }
    }

  
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedStudent]); // Empty dependency array to run the effect only once

  return (
    <div className="students dynamic">
      <StudentPopUp stpopup={stpopup} setStpopup={setStpopup}/>
      <div className="upper-comp">
        <div className="uc-left">
          <label htmlFor="">
            Subject : <input type="text" placeholder="enter subject" value={subject} onChange={((e)=> setSubject(e.target.value))}/>
          </label>
          <div className="uds">{Date(Date.now()).toLocaleString()}</div>
        </div>
        <div className="uc-right">
        
          <div className="add-studentbtn">
          Add Student
            <button onClick={() => (setStpopup(true))} >🧑+</button>
          </div>
        <div className="ustbtns">
          Switch
          <button onClick={() => students.length && dispatch(switchIsPresent({cid:text2.substring(1),isPresent:true}))}>P</button>
          <button  onClick={() =>students.length && dispatch(switchIsPresent({cid:text2.substring(1),isPresent:false}))}>A</button>
        </div>
        </div>
      </div>
      <ol >
      { students.length?  students.map((student,index) => 
      
      <li key={student.id} className={selectedStudent === index + 1 ?'selected' : ''} ><StudentItem student={student}/></li>
      
      ):<Helper name={"student"} src={addStudentImage}/>}
      </ol>
      <div className="attendanceResult" style={students.length? {display:"flex"} : {display:"none"}}>
        <h2>Attendance Result</h2>
        <div className="data-box">
        <div className="db-top">
         <div className="db-top-text">
          <p><span>🙂Present</span><span>:</span><span>{calculateIsPresent()}</span></p>
          <p><span>😟Absent</span><span>:</span><span>{students.length - calculateIsPresent()}</span></p>
          <p><span>🤙Total</span><span> :</span><span>{students.length}</span></p>
         </div>
        </div>
        <div className="db-bottom">
          <button onClick={() => subject?(generateAttendancePDF(students,text3.substring(1),subject),setSuccessMessageDisplay("flex"),setSuccessMessage("All done")):(setSuccessMessageDisplay("flex"),setSuccessMessage("Subject is not provided"))}>Take PDF 📂</button>
          <button>Save to db</button>
        </div>
        </div>
      </div>

      <SuccessMessage message={successMessage} display={successMessageDisplay} setDisplay={setSuccessMessageDisplay}/>
    </div>
  );
}

export default Students;
