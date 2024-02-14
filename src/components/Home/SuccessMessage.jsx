import React from 'react'
import './SuccessMessage.css'
const SuccessMessage = ({message="All done",display="none",setDisplay}) => {

if(display !== "none"){
    setTimeout(() => {
        setDisplay("none")
    }, 3000);
}
  return (
    <div className='sm-container' style={{display:display}}>
        <button className="sm-remove" onClick={() => setDisplay("none")}>❌</button>
        <p><span>{message === "All done" ?"✔️" :"😟"}</span>{message}</p>
    </div>
  )
}

export default SuccessMessage