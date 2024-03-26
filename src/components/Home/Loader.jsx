import React from 'react'
import { RingLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={
      {width:"100%",
       height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center", 
        zIndex:100000,
        position:"fixed",
        top:0,
        left:0,
        backgroundColor:"#123"
      }
    }>
      <RingLoader /></div>

  )
}

export default Loader