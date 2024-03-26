import React, { createContext, useState } from 'react'

export const  authContext = createContext()

function AuthContext({children}) {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const data = {
    isLoggedIn,
    setIsLoggedIn
  }
  return (
    <authContext.Provider value={data}>
        {children}
    </authContext.Provider>
  )
}

export default AuthContext