import React, { useEffect, useRef } from "react";
import "./History.css";
import HistoryCard from "./HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../../Slices/classesSlice";

function History() {
  const comp = useRef(null)
  const classes = useSelector((state) => state.class.classes);
  const userDetails = useSelector((state) => state.user.details)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchClasses(userDetails._id));
  }, []);

  useEffect(() => {
    if(comp.current){
      const t = gsap.timeline()
      t.from(".hli-anim",{
        duration:0.5,
        delay:0.2,
        opacity:0,
        scale:0.5,
        stagger:0.2
      })
    }
    
  },[comp])
  return (
    <>
      <div className="history dynamic" ref={comp}>
        {classes &&
          classes.map((Class) => <HistoryCard data={Class} key={Class._id}  />)}
      </div>
    </>
  );
}

export default History;
