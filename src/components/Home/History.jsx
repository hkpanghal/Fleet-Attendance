import React, { useEffect } from "react";
import "./History.css";
import HistoryCard from "./HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../../Slices/classesSlice";

function History() {
  const classes = useSelector((state) => state.class.classes);
  const userDetails = useSelector((state) => state.user.details)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchClasses(userDetails._id));
  }, []);
  return (
    <>
      <div className="history dynamic">
        {classes &&
          classes.map((Class) => <HistoryCard data={Class} key={Class._id} />)}
      </div>
    </>
  );
}

export default History;
