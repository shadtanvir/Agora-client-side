import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import useTitle from "../hooks/UseTitle";
import loginLottie from "../assets/Login.json";
import registerLottie from "../assets/Register.json";
import Lottie from "lottie-react";
import axios from "axios";

const JoinUs = () => {
  const {
    signIn,
    createUser,
    updateUser,
    googleSignIn,
    githubSignIn,
    setUser,
  } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  useTitle(isLogin ? "Login" : "Register");

  // 🔹 Handle Login
  const onLogin = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location.state?.from || "/");
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Oops...", text: err.code })
      );
  };

  // 🔹 Handle Registration
  const onRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
      });
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: data.name, photoURL: data.photoUrl })
          .then(() => {
            setUser({
              ...user,
              displayName: data.name,
              photoURL: data.photoUrl,
              badge: "bronze",
              role: "user",
            });
            // console.log(user);
            axios.post("http://localhost:5000/register", {
              email: data.email,
              name: data.name,
              photoURL: user.photoURL,
              badge: "bronze",
              role: "user",
            });
          })
          .catch(() => setUser(user));

        Swal.fire({
          icon: "success",
          title: "Account created!",
          text: "You received a Bronze Badge!",
        });

        reset();
        navigate("/");
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Oops...", text: err.code })
      );
  };

  // 🔹 Social Logins
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        axios.post("http://localhost:5000/register", {
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL,
          badge: "bronze",
          role: "user",
        });

        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Oops...", text: err.code })
      );
  };

  return (
    <div className=" min-h-screen font-poppins flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-primary text-center font-poppins">
          {isLogin ? "Login to your account" : "Register your account"}
        </h2>

        <form
          onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}
          className="card-body"
        >
          <fieldset className="fieldset">
            {!isLogin && (
              <>
                <label className="label">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="input"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}

                <label className="label">Photo URL</label>
                <input
                  {...register("photoUrl", { required: true })}
                  className="input"
                  placeholder="Photo URL"
                />
                {errors.photoUrl && (
                  <span className="text-red-500">Photo URL is required</span>
                )}
              </>
            )}

            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}

            <label className="label">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                className="input pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-5 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <IoEyeOutline size={21} />
                ) : (
                  <IoMdEyeOff size={21} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}

            {!isLogin && (
              <>
                <label className="label">Confirm Password</label>
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  className="input"
                  placeholder="Confirm Password"
                />
              </>
            )}

            <button
              type="submit"
              className="btn border-primary bg-blue-600 text-white font-poppins mt-4"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            <p className="font-semibold text-center pt-5">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>

            <div className="divider">OR</div>

            {/* Social logins */}
            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              {isLogin ? "Login " : "Sign Up "}
              with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;
