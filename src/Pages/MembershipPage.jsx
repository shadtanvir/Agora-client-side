import { useContext } from "react";
import StripeWrapper from "../components/StripeWrapper";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

const MembershipPage = () => {
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
    enabled: !!user?.email, // only fetch when email exists
  });

  if (isLoading) return <Loading />;
  if (error) {
    console.error("Error fetching user:", error);
    return <div className="text-red-600 text-center">Failed to load user.</div>;
  }

  const badge = userData?.badge;

  if (badge === "gold") {
    return (
      <div className="max-w-lg mx-auto p-6 shadow rounded bg-white text-center">
        <h2 className="text-xl font-bold mb-4">
          You’re Already a Gold Member!
        </h2>
        <p className="text-green-600">
          Thanks for supporting our community. You already have unlimited
          posting rights.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Membership Upgrade</h2>
      <p className="mb-4">
        Pay $5 to become a Gold Member and unlock unlimited posting!
      </p>
      <StripeWrapper amount={5} />
    </div>
  );
};

export default MembershipPage;
