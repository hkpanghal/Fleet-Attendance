import React from 'react'
import HamburgerIcon from './HmburgerIcon'
import { useParams } from 'react-router-dom'



function Topbar() {
const {text} = useParams();
  return (
    <div className='topbar'>
      <HamburgerIcon/>
      <h1>{text?.substring(1)}</h1>
      <div className='profile-logo'>

      </div>
    </div>
  )
}

export default Topbar