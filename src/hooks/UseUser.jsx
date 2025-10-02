import { useEffect, useState, useContext } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const UseUser = () => {
  const [userDb, setUserDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/get-user?email=${user.email}`);
        setUserDb(res.data);
      } catch (err) {
        // console.error("Error fetching user from DB:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email, axiosSecure]);

  return { userDb, loading, error };
};

export default UseUser;
