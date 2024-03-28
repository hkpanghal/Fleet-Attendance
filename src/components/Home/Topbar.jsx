import React from "react";
import HamburgerIcon from "./HmburgerIcon";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Topbar() {
  const userDetails = useSelector((state) => state.user.details)
  const path = useLocation().pathname.split("/").filter(segment => segment.trim() !== '')

  return (
    <div className="topbar">
      <HamburgerIcon />
      <h1>{path.length ? path[0]:"Classes"}</h1>
      <div className="profile-logo">{userDetails?.first_name.substring(0,1)}</div>
    </div>
  );
}

export default Topbar;
