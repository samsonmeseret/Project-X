import React, { useContext, useEffect, useState } from "react";
import UserTable from "./components/UsersTable";
import Login from "./pages/Sign in/Login";
import AuthContext from "./context/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import SharedNav from "./components/SharedNav/SharedNav";
import Dashboard from "./pages/Dashboard/mainView/Main";
import PatientTable from "./components/dashboardComponents/PatientsTable/PatientsTable";
import ExpenseTable from "./components/dashboardComponents/ExpenseTable/ExpenseTable";
import BookingTable from "./components/dashboardComponents/BookingTable/BookingTable";
import DataVisual from "./components/dashboardComponents/DataVisualization/DataVisual";
import ProtectedRoute from "./context/ProtectedRoute";
import RoleProtectection from "./context/RoleBasedProtect";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
const ME_URL = "http://localhost:4000/me";

const App = () => {
  const ctx = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedNav />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DataVisual />} />
          <Route path="dashboard" element={<DataVisual />} />
          <Route
            path="patients"
            element={
              <RoleProtectection roles={["admin", "doctor", "reception"]}>
                <PatientTable />
              </RoleProtectection>
            }
          />
          <Route
            path="expense"
            element={
              <RoleProtectection roles={["admin", "reception"]}>
                <ExpenseTable />
              </RoleProtectection>
            }
          />
          <Route
            path="booking"
            element={
              <RoleProtectection roles={["admin", "reception"]}>
                <BookingTable />
              </RoleProtectection>
            }
          />
          <Route
            path="users"
            element={
              <RoleProtectection roles={["admin"]}>
                <UserTable />
              </RoleProtectection>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
