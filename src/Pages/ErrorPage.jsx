import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import pageNotFound from "../assets/Error 404.json";
import useTitle from "../hooks/UseTitle";

const ErrorPage = () => {
  useTitle("404 - Page Not Found");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-50 to-blue-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center p-6 md:p-10  "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-200 max-w-full mx-auto text-center mb-6"
        >
          <Lottie animationData={pageNotFound} loop={true} />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary mb-4">
          404 – Page Not Found
        </h1>
        <p className="text-base md:text-lg text-gray-700 font-inter mb-6">
          We couldn’t find the page you’re looking for. It may have been moved,
          deleted, or never existed. Let’s get you back on track.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" bg-blue-600 text-white text-lg rounded-lg font-poppins font-semibold px-6 py-2 shadow-lg hover:shadow-2xl transition"
          >
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
