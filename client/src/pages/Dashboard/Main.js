import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SideBar from "./Sidebar";
import style from "./main.module.css";

const Main = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={style.dashboard}>
      <SideBar open={open} style={"sidebar"} />
      <div>
        <div className={style.upnav}>
          <div
            className={style.menu}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </div>
          <div className={style.signout}>
            <Link onClick={() => {}} to={"/home"}>
              SignOut
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
