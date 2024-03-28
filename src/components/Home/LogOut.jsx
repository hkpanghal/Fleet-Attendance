import React, { useContext } from 'react'
import "./Logout.css"
import { authContext } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setIsLoggedIn} from "../../Slices/userDetailsSlice"
function LogOut() {
  // const {setIsLoggedIn} = useContext(authContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem("user_data")
    setIsLoggedIn((prev) => !prev)
    dispatch(setIsLoggedIn(false))
    navigate("/",)
  }
  return (
    <div className='logout dynamic'>
      <div className="logout-container">
        <button className='btn-log-out' onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  )
}

export default LogOut