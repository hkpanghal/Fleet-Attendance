import { createSlice,nanoid } from "@reduxjs/toolkit";
import { delelemStudentArray } from "./classesSlice";

const initialState = {
    students:[]
}

export const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        addStudent: (state,action) => {
            const student = {
                id:action.payload.id,
                cid:action.payload.cid,
                uid:action.payload.uid,
                name:action.payload.name,
                rollNumber:action.payload.rollNumber,
                isPresent:action.payload.isPresent,
                dateCreated:action.payload.dateCreated,
                contentEditable:false,

            }
            state.students.push(student);
        },
        deleteStudent:  (state,action) => {
            
            state.students = state.students.filter((student) => student.id !== action.payload)
            
        },

        setContentEditable: (state,action) => {
            state.students.map((student) => student.id === action.payload.id ? student.contentEditable = action.payload.contentEditable : student)
        },
        updateStudent:(state,action)=>{
            state.students.map((student) => student.id === action.payload.id ? (student.name = action.payload.name,student.rollNumber=action.payload.rollNumber) : student)
        },
        switchIsPresent:(state,action) =>{
            state.students.map((student) => student.cid === action.payload.cid? student.isPresent = action.payload.isPresent : student)
        },

        markIsPresent:(state,action) =>{
            console.log(action.payload.sid)

            state.students.map((student) => student.id === action.payload.sid? student.isPresent = action.payload.isPresent : student)
        },
        
        deleteStudentsWhenClassIsDeleted:(state,action) => {
            state.students = state.students.filter((student) => student.cid !== action.payload.cid);
        }
    }
})

export const {addStudent , deleteStudent,setContentEditable,updateStudent,switchIsPresent,markIsPresent , deleteStudentsWhenClassIsDeleted} = studentSlice.actions
export default studentSlice.reducer;