import React, { useState } from 'react'
import "./studentItem.css"
import { useDispatch } from 'react-redux'
import { deleteStudent, markIsPresent } from '../../Slices/studentsSlice'
import { updateStudent } from '../../Slices/studentsSlice'
import { setContentEditable } from '../../Slices/studentsSlice'
import { delelemStudentArray } from '../../Slices/classesSlice'
import { useParams } from 'react-router-dom'
const StudentItem = ({student}) => {
  const [stname,setStname] = useState(student.name)
  const [strollnumber,setStrollnumber] = useState(student.rollNumber)
  const dispatch = useDispatch()
  const {text1,text2} = useParams()
  function handleEdit(){
    // const ready = confirm("Are you want to edit student details if yes don't forget to save")
    if(student.contentEditable === false){
     
      dispatch(setContentEditable({id:student.id,contentEditable:true}))
      console.log("hello")
    }
    else{
      console.log("bye")
      dispatch(updateStudent({id:student.id,name:stname,rollNumber:strollnumber}));
      dispatch(setContentEditable({id:student.id,contentEditable:false}))
    }
  }
  return (
    <div className='studentItem'>
      <div className="left erbtns">
        <button className='editbtn' onClick={() => handleEdit()}>{student.contentEditable === true?"📂":"✏️"}</button>
        <button className='delbtn' onClick={() => confirm() === true ? (dispatch(deleteStudent(student.id)),dispatch(delelemStudentArray({cid:text2.substring(1),sid:student.id}))):console.log(student.id)}>❌</button>
      </div>
      <div className="middle stdata">
         <div className="icon">🧑</div>
         <div className="sttext">
            <p><input type="text" value={stname}      onChange={((e) => setStname(e.target.value))} placeholder='enter name and save' readOnly={!student.contentEditable} style={student.contentEditable?{border:"1px solid black"}:{border:"none"}}/></p>
            <p><input type="text" value={strollnumber} onChange={((e) => setStrollnumber(e.target.value))} placeholder='enter value and save'readOnly={!student.contentEditable} style={student.contentEditable?{border:"1px solid black"}:{border:"none"}} /> </p>
         </div>
      </div>
      <div className="right pabtns">
        <label htmlFor="">Present<input type="radio"  checked={student.isPresent}  onChange={()=> dispatch(markIsPresent({sid:student.id,isPresent:true}))}  /></label>
        <label htmlFor="">Absent<input type="radio"   checked={!student.isPresent} onChange={()=> dispatch(markIsPresent({sid:student.id,isPresent:false}))}  /></label>
      </div>
    </div>
  )
}

export default StudentItem