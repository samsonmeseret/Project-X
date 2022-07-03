import { useContext, useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
// import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
