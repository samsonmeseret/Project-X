import React, { useContext, useEffect, useState } from "react";
import UserTable from "./components/UsersTable";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
const ME_URL = "http://localhost:4000/me";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="staff" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
