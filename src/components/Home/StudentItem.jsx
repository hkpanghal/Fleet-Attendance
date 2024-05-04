import React, { useState } from 'react'
import "./studentItem.css"
import { useDispatch } from 'react-redux'
import { deleteStudent, markIsPresent } from '../../Slices/studentsSlice'
import { updateStudent } from '../../Slices/studentsSlice'
import { delelemStudentArray } from '../../Slices/classesSlice'
import { useParams } from 'react-router-dom'
import { deleteStudentFromDb, updateStudentDetailsToDb } from '../../backend/backend'

const StudentItem = ({student,index}) => {
  const [stname,setStname] = useState(student.first_name + " " + student.last_name)
  const [strollnumber,setStrollnumber] = useState(student.roll_number)
  const dispatch = useDispatch()
  const [contentEditable,setContentEditable] = useState(false)
  const {class_id} = useParams()
  const [isLoading,setIsLoading] = useState(false)

  const handleSetEditable = () => {
    const isConfirmed = confirm("Don't forget to save")
    if(isConfirmed){
      setContentEditable(true)
    }
  }


  const handleUpdateStudent = () => {
    const data = stname.split(" ").filter((elem) => elem.length > 0)
 
    if(data.length>0){
        const first_name = data[0]
        const last_name = ( data.length > 1 ? data.slice(1) : data[1])?.join(" ") ?? " "
        const details = {
            student_id:student._id,
            first_name,
            last_name,
            roll_number:strollnumber,
            index
        }

        setIsLoading(true)
        updateStudentDetailsToDb(student._id,student.created_by,first_name,last_name,strollnumber)
        .then((res) => {
            if(res.data.success){
                dispatch(updateStudent(details))
                setIsLoading(false)
                setContentEditable(false)
                alert("Details updated Successfully") 
            }
        })
       .catch((err) => {
        console.log(err)
        setIsLoading(false)
        alert("Some error occurred while updating details please try again !!")
       })

        return
    }

    alert("Student name and roll number must not be empty")
}


const handleDeleteStudent = () =>{
   const isConfirmed = confirm("Are you sure ?")
   if(isConfirmed){
    setIsLoading(true)
          deleteStudentFromDb(student.class_belongs,student._id)
          .then((res) => {
              if(res.data.success){
                  dispatch(delelemStudentArray({class_id:res.data.student.class_belongs,student_id:res.data.student._id}))
                  dispatch(deleteStudent({student_id:res.data.student._id}))
                  setIsLoading(false)
                  alert("Student Deleted SuccessFully")
              }
          })
          .catch((err) => {
              console.log(err)
              setIsLoading(false)
              alert("Some error occurred while deleting the student")
          })
   }
}
  return (
    <div className='studentItem'>
      <div className="left erbtns">
        <button className='editbtn' onClick={() => contentEditable ? handleUpdateStudent():handleSetEditable()}>{contentEditable === true?"📂":"✏️"}</button>
        <button className='delbtn' onClick={handleDeleteStudent}>❌</button>
      </div>
      <div className="middle stdata">
         <div className="icon">🧑</div>
         <div className="sttext">
            <p><input type="text" value={stname}      onChange={((e) => setStname(e.target.value))} placeholder='enter name and save' readOnly={!contentEditable} style={contentEditable?{border:"1px solid black"}:{border:"none"}}/></p>
            <p><input type="text" value={strollnumber} onChange={((e) => setStrollnumber(e.target.value))} placeholder='enter value and save'readOnly={!contentEditable} style={contentEditable?{border:"1px solid black"}:{border:"none"}} /> </p>
         </div>
      </div>
      <div className="right pabtns">
        <label htmlFor="">Present<input type="radio"  checked={student.is_present}  onChange={()=> dispatch(markIsPresent({_id:student._id,is_present:true,index}))}  /></label>
        <label htmlFor="">Absent<input type="radio"   checked={!student.is_present} onChange={()=> dispatch(markIsPresent({_id:student._id,is_present:false,index}))}  /></label>
      </div>
    </div>
  )
}

export default StudentItem