import React from "react";
import { RingLoader } from "react-spinners";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader-comp">
      <RingLoader />
    </div>
  );
};

export default Loader;
