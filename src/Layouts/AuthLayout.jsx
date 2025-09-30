import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Loading from "../components/Loading";

const AuthLayout = () => {
  const { state } = useNavigation();
  return (
    <>
      <Navbar></Navbar>

      <div className="">
        <div className=" min-h-[calc(100vh-84)]">
          {state === "loading" ? <Loading /> : <Outlet></Outlet>}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
