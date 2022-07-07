import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import "./main.css";

const Main = () => {
  return (
    <div className="dashboard">
      <SideBar style={"sidebar"} />
      <Outlet />
    </div>
  );
};

export default Main;
