import React, { useState, useContext } from "react";
import AuthContext from "../../../context/Auth";
import { NavLink } from "react-router-dom";
// import logo from "../../Image/logo.png";
import "./nav.css";

const Navigation = () => {
  let activeStyle = {
    color: "#764af1",
  };
  const [open, setOpen] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <header className="nav-container">
        <div className="nav">
          <div className="nav-logo">
            {/* <img src={logo} alt="Heal Eye Logo" /> */}
            <h1>HealEye</h1>
          </div>
          <div className={`${open ? "nav-links toggle" : "nav-links"}`}>
            <ul>
              <li>
                <NavLink
                  to={"/"}
                  style={({ isActive }) => {
                    return isActive ? activeStyle : undefined;
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/book"}
                  style={({ isActive }) => {
                    return isActive ? activeStyle : undefined;
                  }}
                >
                  Book
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={"/Services"}
                  style={({ isActive }) => {
                    return isActive ? activeStyle : undefined;
                  }}
                >
                  Services
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={"/contacts"}
                  style={({ isActive }) => {
                    return isActive ? activeStyle : undefined;
                  }}
                >
                  Contacts
                </NavLink>
              </li>
              {console.log(isLoggedIn)}
              {!isLoggedIn ? (
                <li>
                  <NavLink
                    to={"/auth/login"}
                    style={({ isActive }) => {
                      return isActive ? activeStyle : undefined;
                    }}
                  >
                    SignIn
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to={"/workspace"}
                    style={({ isActive }) => {
                      return isActive ? activeStyle : undefined;
                    }}
                  >
                    WorkSpace
                  </NavLink>
                </li>
              )}
              {isLoggedIn ? (
                <li>
                  <button
                    onClick={() => {
                      logout();
                    }}
                  >
                    SignOut
                  </button>
                </li>
              ) : undefined}
            </ul>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className={`${open ? "menu open" : "menu"}`}
          >
            <span className="menu-top"></span>
            <span className="menu-middle"></span>
            <span className="menu-botton"></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;
