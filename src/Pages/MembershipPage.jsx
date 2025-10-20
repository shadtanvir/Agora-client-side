import { useContext } from "react";
import StripeWrapper from "../components/StripeWrapper";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../hooks/UseTitle";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaMedal, FaLock, FaCheckCircle } from "react-icons/fa";

const MembershipPage = () => {
  useTitle("Membership");
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <div className="text-red-600 text-center mt-20">
        Failed to load user details.
      </div>
    );
  }

  const badge = userData?.badge;

  // If user is not logged in
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center  text-center px-6 font-poppins max-w-xl my-20 mx-auto p-8 shadow-xl rounded-2xl"
      >
        <FaLock className="text-5xl text-primary mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-3">
          Become a Member of Agora
        </h2>
        <p className="text-base text-base-content/80 max-w-md mb-6">
          Log in to your Agora account to upgrade to Gold Membership and enjoy
          exclusive benefits including unlimited posting and special
          recognition.
        </p>
        <Link
          to="/auth"
          className="px-6 py-3 bg-primary text-base-100 rounded-lg font-semibold shadow-md hover:bg-primary-focus transition duration-300"
        >
          Login to Continue
        </Link>
      </motion.div>
    );
  }

  // If user already has gold badge
  if (badge === "gold") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl my-20 mx-auto p-8 shadow-xl rounded-2xl  text-center font-poppins"
      >
        <FaMedal className="text-5xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-3">
          You’re Already a Gold Member!
        </h2>
        <p className="text-base text-base-content/80 mb-6">
          Thank you for supporting our community. You already enjoy unlimited
          posting rights and exclusive recognition across the Agora platform.
        </p>
        <Link
          to="/dashboard/user-profile"
          className="inline-block px-5 py-2 bg-primary text-base-100 rounded-lg shadow hover:bg-primary-focus transition"
        >
          Go to My Profile
        </Link>
      </motion.div>
    );
  }

  // Normal user (show upgrade/payment)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto my-20 p-8 shadow-xl rounded-2xl  font-poppins"
    >
      <div className="text-center mb-8">
        <FaMedal className="text-5xl text-yellow-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-primary mb-2">
          Upgrade to Gold Membership
        </h2>
        <p className="text-base text-base-content/80 max-w-md mx-auto">
          Unlock unlimited posting, priority visibility, and special recognition
          with the Gold Badge. Support the Agora community and elevate your
          experience.
        </p>
      </div>

      <div className="bg-base-300 rounded-xl p-6 shadow-inner">
        <h3 className="text-lg font-semibold mb-3 text-primary text-center">
          Membership Benefits
        </h3>
        <ul className="space-y-3 text-base-content/80 mb-6">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-success" /> Unlimited post creation
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-success" /> Exclusive Gold badge
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-success" /> Priority visibility on
            posts
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-success" /> Access to upcoming
            premium features
          </li>
        </ul>

        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            Upgrade for only <span className="text-primary font-bold">$5</span>
          </p>
          <StripeWrapper amount={5} />
        </div>
      </div>
    </motion.div>
  );
};

export default MembershipPage;
