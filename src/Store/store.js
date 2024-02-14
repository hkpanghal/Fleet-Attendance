import { configureStore } from "@reduxjs/toolkit";
import classReducer from "../Slices/classesSlice";
import studentReducer from "../Slices/studentsSlice"
import rootReducer from "./rootReducer";
export const store =  configureStore({
    reducer: rootReducer
})
