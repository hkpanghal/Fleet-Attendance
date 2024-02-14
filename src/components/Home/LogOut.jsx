import React from 'react'
import { logOut } from '../../appwrite/auth'
function LogOut() {
  return (
    <div className='logout dynamic'>
      <button onClick={() => {logOut().then(() => window.location.reload())}}>
        LogOut
      </button>
    </div>
  )
}

export default LogOut