import { Navigate } from "react-router";
import Loading from "./Loading";
import useRole from "../hooks/UseRole";

const DashboardIndex = () => {
  const { role, loading } = useRole();
  console.log(role);

  if (loading) return <Loading></Loading>;

  if (role === "admin") return <Navigate to="/dashboard/admin-profile" />;
  if (role === "user") return <Navigate to="/dashboard/user-profile" />;

  return <Navigate to="/" />;
};

export default DashboardIndex;
