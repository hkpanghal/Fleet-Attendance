import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.user.details)

  return (
    
    <div className='profile dynamic'>
      
    </div>
  )
}

export default Profile