import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./Auth";
import Login from "../pages/Sign in/Login";

const ProtectedRoute = ({ children }) => {
  const ctx = useContext(AuthContext);
  if (ctx.isLoggedIn) {
    return children;
  }
  return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
