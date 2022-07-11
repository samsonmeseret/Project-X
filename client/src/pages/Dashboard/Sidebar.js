import React from "react";
import { NavLink } from "react-router-dom";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./sidebar.css";
const SideBar = ({ open }) => {
  return (
    <>
      <div className={open ? "sidebar" : "closed_bar"}>
        <div className="logo">
          <h1>HealEye</h1>
        </div>
        <ul>
          <li>
            <NavLink to="dashboard">
              <GridViewOutlinedIcon /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="patients">
              <FolderSharedOutlinedIcon /> <span>Patients</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="expense">
              <LocalAtmOutlinedIcon /> <span>Expense</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="booking">
              <BookmarkAddedOutlinedIcon /> <span>Booking</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="users">
              <PeopleAltOutlinedIcon /> <span>Users</span>
            </NavLink>
          </li>
        </ul>
        <div className="profile">
          <div className="img"></div>
          <div className="info">
            <h4>Samson Meseret</h4>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
