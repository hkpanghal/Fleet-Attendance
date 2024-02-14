import React from 'react'
import HamburgerIcon from './HmburgerIcon'
import { useParams } from 'react-router-dom'



function Topbar() {
const {text} = useParams();
const {text1,text2} = useParams();
  return (
    <div className='topbar'>
      <HamburgerIcon/>
      <h1>{text1? text1?.substring(1):text?.substring(1)}</h1>
      <div className='profile-logo'>
      </div>
    </div>
  )
}

export default Topbar