import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAttendances } from "../../Slices/attendanceSlice";
import Loader from "./Loader";
import SnapItem from "./SnapItem";
import "../Home/SnapShots.css"

function Snapshots() {

  const comp = useRef(null)

  const { class_id, user_id } = useParams();
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.attendance.data);
  const isLoading = useSelector((state) => state.attendance.isLoading);

  useEffect(() => {
    dispatch(fetchAttendances({ class_id, user_id }));
  }, []);


  useEffect(() => {
    if(comp.current){
     
      const t = gsap.timeline()
      t.from(".spi-anim",{
        duration:0.5,
        delay:0.2,
        opacity:0,
        scale:0.5,
        stagger:0.2
      })
    }
  },[isLoading])

  if (isLoading) {
    return <Loader />;
  }


  return (
    
    historyData.length &&
    <div className="snapshot dynamic" ref={comp}>
    
        {
            historyData && historyData.map((data) =>(
              <SnapItem key={data._id} elem={data}/>
                
            ))
        }
    </div>

  )
}

export default Snapshots;
