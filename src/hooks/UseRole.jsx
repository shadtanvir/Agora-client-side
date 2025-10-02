import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return { role: "" };
      const res = await axiosSecure.get(`/get-user-role?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only run when email exists
  });

  return { role: data?.role || "", loading, error };
};

export default useRole;
