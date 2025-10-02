import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const UseUser = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["userDb", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/get-user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { userDb: data, loading, error };
};

export default UseUser;
