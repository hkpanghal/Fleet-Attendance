import React, { useEffect, useRef } from 'react'
import "./HistoryCard.css"
import { useNavigate } from 'react-router-dom'
function HistoryCard({data}) {
  const navigate = useNavigate()
  return (
    <div className='historyCard hli-anim' onClick={() => navigate(`/SnapShots/${data._id}/${data.created_by}`)}>
        <div className="upper">
            <p>Students : {data.students.length}</p>
        </div>

        <div className="bottom">
            <h3>{data.class_name}</h3>
        </div>
    </div>
  )
}

export default HistoryCard