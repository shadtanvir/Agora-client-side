import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
const UseAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        logOut()
          .then(() => {
            // alert("You are logged out!");
          })
          .catch((error) => {
            // alert(error);
          });
        toast.error("Unauthorized Access!");
      }
      if (error.status === 403) {
        toast.error("Forbidden Access!");
      }
    }
  );
  return axiosInstance;
};

export default UseAxiosSecure;
