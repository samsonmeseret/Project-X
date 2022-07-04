import React, { useContext, useEffect, useState } from "react";
import UserTable from "./components/UsersTable";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import SharedNav from "./components/SharedNav/SharedNav";
import "./App.css";
const ME_URL = "http://localhost:4000/me";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedNav />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
        </Route>
        <Route path="/staff" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
