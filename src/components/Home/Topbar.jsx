import React from "react";
import HamburgerIcon from "./HmburgerIcon";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Topbar() {
  const userDetails = useSelector((state) => state.user.details)
  const { text } = useParams();
  const { text1, text2 } = useParams();
  return (
    <div className="topbar">
      <HamburgerIcon />
      <h1>{text1 ? text1?.substring(1) : text?.substring(1)}</h1>
      <div className="profile-logo">{userDetails?.first_name.substring(0,1)}</div>
    </div>
  );
}

export default Topbar;
