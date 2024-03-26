import { combineReducers } from "@reduxjs/toolkit";
import classReducer from "../Slices/classesSlice";
import studentReducer from "../Slices/studentsSlice"
import attedanceReducer from "../Slices/attendanceSlice"
import userDetailsReducer from "../Slices/userDetailsSlice"	


 const rootReducer = combineReducers({
      class:classReducer,
      student:studentReducer,
      attendance:attedanceReducer,
      user:userDetailsReducer,
})

export default rootReducer