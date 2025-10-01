import React from "react";
import { Navigate } from "react-router";
import UseRole from "../hooks/UseRole";
import UserDashboard from "../Pages/UserDashboard";
import Loading from "../components/Loading";
import AdminDashboard from "../Pages/AdminDashboard";

const DashboardLayout = () => {
  const { role, loading } = UseRole();
  if (loading) {
    return <Loading></Loading>;
  }
  if (role === "user") return <UserDashboard></UserDashboard>;
  if (role === "admin") return <AdminDashboard></AdminDashboard>;
  return <Navigate to="/" />;
};

export default DashboardLayout;
