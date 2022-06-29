import React, { useContext, useEffect } from "react";
import UserTable from "./components/UsersTable";
import Login from "./pages/Login";
import AuthContext from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import Home from "./pages/Home";
const ME_URL = "http://localhost:4000/me";

const App = () => {
  const { setUser, user, setToken } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCurrentUser = async () => {
      try {
        const response = await axios.get(ME_URL, {
          headers: { authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        console.log(response.data.me);
        const me = response.data.me;
        isMounted && setToken(token);
        isMounted && setUser(me);
      } catch (err) {
        console.log(err.response);
      }
    };
    getCurrentUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />} />

        <Route
          path="staff"
          element={
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
