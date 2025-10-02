import { useContext } from "react";
import StripeWrapper from "../components/StripeWrapper";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../hooks/UseTitle";

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
    return <div className="text-red-600 text-center">Failed to load user.</div>;
  }

  const badge = userData?.badge;

  if (badge === "gold") {
    return (
      <div className="max-w-lg my-20 mx-auto p-6 shadow rounded bg-base-300 text-center">
        <h2 className="text-xl font-bold text-primary mb-4">
          You’re Already a Gold Member!
        </h2>
        <p className="">
          Thanks for supporting our community. You already have unlimited
          posting rights.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-20 p-6 shadow rounded bg-base-300">
      <h2 className="text-xl text-primary font-bold mb-4">
        Membership Upgrade
      </h2>
      <p className="mb-4">
        Pay $5 to become a Gold Member and unlock unlimited posting!
      </p>
      <StripeWrapper amount={5} />
    </div>
  );
};

export default MembershipPage;
