import React from 'react'
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