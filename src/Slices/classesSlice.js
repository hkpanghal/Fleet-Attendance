import { createSlice, nanoid } from "@reduxjs/toolkit";
import { userDetails } from "../components/Home/userdetails";
import Classes from "../components/Home/Classes";

const initialState = {
    classes:[],
}

export const classSlice = createSlice({
    name:"Class",
    initialState,
    reducers:{
        addClass: (state,action) => {
            const Class = {
                id:action.payload.id,
                name:action.payload.name,
                students: action.payload.students,
                dateCreated:action.payload.dateCreated,
                userid:action.payload.userid,
                contentEditable:false,
            }

            state.classes.push(Class);
        },
        deleteClass:(state,action) => {
          state.classes = state.classes.filter( (Class) => Class.id !== action.payload);
          
        },
        setContentEditable: (state,action) => {
            state.classes.map((Class) => Class.id === action.payload.id ? Class.contentEditable = action.payload.contentEditable : Class)
        },
        renameClass:(state,action)=>{
            state.classes.map((Class) => Class.id === action.payload.id ? Class.name = action.payload.name : Class)
        },
        addelemStudentArray: (state,action) =>{
            state.classes.map((Class) => Class.id === action.payload.id ? Class.students.push(action.payload.sid): Class)
        },

        delelemStudentArray:(state,action) => {
           
            state.classes.map((Class) => Class.id === action.payload.cid ? Class.students.map((elem,index) => elem === action.payload.sid? Class.students.splice(index,1):elem): Class)

        }

    }
})

export const {addClass , deleteClass ,renameClass ,setContentEditable,addelemStudentArray ,delelemStudentArray} = classSlice.actions
export default classSlice.reducer