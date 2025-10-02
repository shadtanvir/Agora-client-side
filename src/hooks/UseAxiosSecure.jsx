import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { getIdToken } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "https://agora-shadtanvir-server.vercel.app",
});

const UseAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = user.accessToken;
            config.headers.Authorization = `Bearer ${token}`;
          } catch (err) {}
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logOut().then(() => {
            toast.error("Unauthorized Access! You have been logged out.");
          });
        }
        if (error.response?.status === 403) {
          toast.error("Forbidden Access!");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosInstance;
};

export default UseAxiosSecure;
