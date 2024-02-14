import React, { useState } from 'react'
import "./StudentPopUp.css"
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { addStudent } from '../../Slices/studentsSlice';
import { useParams } from 'react-router-dom';
import { addelemStudentArray } from '../../Slices/classesSlice';
function StudentPopUp({stpopup,setStpopup}) {

 const { text1, text2 } = useParams();
 const [customError,setCustomError] = useState("")
 const [stdata,setStdata] = useState({
    id:uuidv4(),
    cid:text2.substring(1),
    uid:null,
    name:"",
    rollNumber:"",
    isPresent:false,
    dateCreated:Date(Date.now()).toLocaleString(),
 })

 const dispatch = useDispatch();
 function adMoreStudent(){
    dispatch(addStudent(stdata));
    dispatch(addelemStudentArray({id:stdata.cid,sid:stdata.id}))
    setStdata({
        id:uuidv4(),
        cid:text2.substring(1),
        uid:null,
        name:"",
        rollNumber:"",
        isPresent:false,
        dateCreated:Date(Date.now()).toLocaleString(),
     });
 }
  return (
    <div className='spopup-conatiner' style={stpopup === true? {display:"flex"} : {display:"none"}}>
        <button className='removebtn' onClick={() => setStpopup(false)}>❌</button>
        <input type="text" placeholder='enter student name'onChange={(e)=> setStdata((prev) => ({...prev,name:(e.target.value)}))} value={(stdata.name)}/>
        <input type="text" placeholder='enter roll number' onChange={(e)=> setStdata((prev) => ({...prev,rollNumber:e.target.value}))} value={stdata.rollNumber}/>
        <button className='addbtn' onClick={()=> stdata.name && stdata.rollNumber? (adMoreStudent(),setCustomError("")): (stdata.name?setCustomError("missing roll number field"):setCustomError("missing name field"))}>Add</button>

        <p>{customError}</p>
    </div>
  )
}

export default StudentPopUp