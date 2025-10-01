import { use, useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const useRole = () => {
  const [role, setRole] = useState("");
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    let isMounted = true;
    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/get-user-role?email=${user.email}`);
        if (isMounted) {
          setRole(res.data.role);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching role:", err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRole();

    return () => {
      isMounted = false; // cleanup if component unmounts
    };
  }, [axiosSecure, user?.email]);

  return { role, loading };
};

export default useRole;
