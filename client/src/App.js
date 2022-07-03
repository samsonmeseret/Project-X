import React, { useContext, useEffect, useState } from "react";
import UserTable from "./components/UsersTable";
import Login from "./pages/Login";
import AuthContext from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import Loader from "./components/Loader";
import Home from "./pages/Home";
const ME_URL = "http://localhost:4000/me";

const App = () => {
  const { setUser, user } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(ME_URL, {
          headers: { authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        console.log(response.data.me);
        const user = response.data.me;
        isMounted && setUser(user);
        isMounted && setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    getCurrentUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
