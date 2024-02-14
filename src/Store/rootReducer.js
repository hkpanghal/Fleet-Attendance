import { combineReducers } from "@reduxjs/toolkit";
import classReducer from "../Slices/classesSlice";
import studentReducer from "../Slices/studentsSlice"
 const rootReducer = combineReducers({
      class:classReducer,
      student:studentReducer
})

export default rootReducer