import { use, useEffect, useState } from "react";
import StripeWrapper from "../components/StripeWrapper";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Loading from "../components/Loading";

const MembershipPage = () => {
  const { user } = use(AuthContext);
  const [badge, setBadge] = useState("");
  const [loading, setLoading] = useState(null);
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/get-user?email=${user.email}`);
        if (isMounted) {
          setBadge(res.data.badge);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching role:", err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // cleanup if component unmounts
    };
  }, [axiosSecure, user?.email]);
  if (loading) return <Loading></Loading>;
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
