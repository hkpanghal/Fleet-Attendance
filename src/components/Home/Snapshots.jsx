import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAttendances } from "../../Slices/attendanceSlice";
import Loader from "./Loader";
import SnapItem from "./SnapItem";
import "../Home/SnapShots.css"

function Snapshots() {
  const { class_id, user_id } = useParams();
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.attendance.data);
  const isLoading = useSelector((state) => state.attendance.isLoading);

  useEffect(() => {
    dispatch(fetchAttendances({ class_id, user_id }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    
    <div className="snapshot dynamic">
    
        {
            historyData && historyData.map((data) =>(
              <SnapItem key={data._id} elem={data}/>
                
            ))
        }
    </div>

  )
}

export default Snapshots;
