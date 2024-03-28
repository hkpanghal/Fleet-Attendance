import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultImage from "../../assets/ic_launcher.png"
import "./Profile.css"
function Profile() {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.user.details)

  return (
    
    <div className='profile dynamic'>
      <div className='profile-container'>
         <div className="profile-img-container">
         <img src={DefaultImage} />
         </div>

         <div className='profile-info'>
          <h3><span>{userDetail.first_name}</span> {userDetail.last_name}<span></span></h3>
           <h4>{userDetail.email}</h4>
         </div>
      </div>
    </div>
  )
}

export default Profile