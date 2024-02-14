import React from 'react'
import "./Helper.css"
const Helper = ({name,src}) => {
  return (
    <div className='helper-container'>
        <h1>{`🙂Don't have any ${name}, to create use`} <span><img src={src} alt="" /></span> button </h1>
    </div>
  )
}

export default Helper