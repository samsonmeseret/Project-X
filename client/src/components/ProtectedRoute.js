import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
