import React, { Children, useEffect, useState } from 'react'
import { getCurrentUser } from './appwrite/auth'
import { RingLoader } from 'react-spinners'
import "./App.css"
import { Navigate, useNavigate } from 'react-router-dom'
import ProtectedRoute from './protected/ProtectedRoute'
import Home from './components/Home/Home'
function App({Children}) {
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)
  const [user,setUser] = useState({
    id:null,name:null,email:null,status:null
  })

  // useEffect(() =>{
  //  getCurrentUser().then((res)=>{
    
  //   if(res){
  //     setUser({id:res.$id,name:res.name,email:res.email,status:res.status})
      
  //     if(res.status){
  //       setLoader(false)
  //      }
     
  //   }
  //   else{
  //     navigate("/SignUp")
  //   }
  //  })
  // },[])


useEffect(() =>{
  if(loader === false){
    navigate(`/Home/Classes/:${'Classes'}`)
 }
} ,[])
  return loader?<div className="loader" style={{visibility:loader===true?"visible":"hidden"}}> <RingLoader /></div>:Children
  
}

export default App