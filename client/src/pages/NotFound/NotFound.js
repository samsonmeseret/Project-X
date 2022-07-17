import React from "react";
import { Link } from "react-router-dom";
import NotFoundSvg from "./NotFoundSvg";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <NotFoundSvg />
      <div className="notfound-info">
        <p>Oops! the Page your looking for was NotFound !</p>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
