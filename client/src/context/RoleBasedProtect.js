import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./Auth";
import Denied from "../pages/permisionDeniedPage/Denied";

const RoleProtectection = ({ children, roles }) => {
  const rolesArray = [...roles];
  const ctx = useContext(AuthContext);
  const access = rolesArray.some((role) => {
    return ctx.whami.includes(role);
  });
  if (access) {
    return children;
  }
  return <Denied />;
};

export default RoleProtectection;
