import React, { Children, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../appwrite/auth';
import { RingLoader } from 'react-spinners';

function ProtectedRoute({Children}) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    
    return loader?<div className="loader" style={{visibility:loader===true?"visible":"hidden"}}> <RingLoader /></div>:Children
}

export default ProtectedRoute