import { motion } from "framer-motion";
import {
  FaUsers,
  FaComments,
  FaArrowUp,
  FaStar,
  FaHandsHelping,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const CommunityImpact = () => {
  const { data: impact = {}, isLoading } = useQuery({
    queryKey: ["communityImpact"],
    queryFn: async () => {
      const res = await axios.get("https://agora-shadtanvir-server.vercel.app/community-impact");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const stats = [
    {
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      label: "Active Members",
      value: impact.totalMembers || 0,
      color: "blue-500 ",
    },
    {
      icon: <FaComments className="text-green-500 text-3xl" />,
      label: "Total Discussions",
      value: impact.totalPosts || 0,
      color: "green-500",
    },
    {
      icon: <FaArrowUp className="text-orange-500 text-3xl" />,
      label: "Total Upvotes",
      value: impact.totalUpvotes || 0,
      color: "orange-500 ",
    },
    {
      icon: <FaStar className="text-yellow-400 text-3xl" />,
      label: "Top Contributors",
      value: impact.topContributors || 0,
      color: "yellow-400",
    },
  ];

  return (
    <section className="pt-10 max-w-6xl mx-auto px-6 ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" mb-8"
      >
        <h2 className="text-2xl  font-semibold text-primary ">
           Community Impact
        </h2>
       
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl shadow-lg p-6  text-${stat.color} flex flex-col items-center justify-center transition-transform`}
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-bold mb-1">
              {stat.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 mt-3 font-medium tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      
    </section>
  );
};

export default CommunityImpact;
