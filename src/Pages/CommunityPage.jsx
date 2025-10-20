import { useContext } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useTitle from "../hooks/useTitle";
import Loading from "../components/Loading";
import {
  FaFire,
  FaMedal,
  FaComments,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

const CommunityPage = () => {
  useTitle("Community");
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // Fetch all community data at once
  const {
    data: communityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community-data"],
    queryFn: async () => {
      const [tagsRes, contributorsRes, postsRes] = await Promise.all([
        axiosSecure.get("/trending-tags"),
        axiosSecure.get("/top-contributors"),
        axiosSecure.get("/recent-posts"),
      ]);
      return {
        trendingTags: tagsRes.data,
        topContributors: contributorsRes.data,
        recentPosts: postsRes.data,
      };
    },
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        Failed to load community data. Please try again later.
      </div>
    );

  const { trendingTags, topContributors, recentPosts } = communityData;

  return (
    <div className="min-h-screen  py-15 w-6xl mx-auto font-poppins">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4">
          Welcome to the Agora Community,{" "}
          {user?.displayName?.split(" ")[0] || "Explorer"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Collaborate, share ideas, and grow with other passionate developers
          worldwide
        </p>
      </motion.div>

      {/* 🔥 Trending Tags Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-6 mb-15"
      >
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-2 mb-8">
          <FaFire className="text-orange-500" /> Trending Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {trendingTags.length > 0 ? (
            trendingTags.map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full text-sm shadow hover:shadow-md cursor-pointer"
              >
                #{tag.name}
              </motion.span>
            ))
          ) : (
            <p className="text-gray-500">No trending tags yet.</p>
          )}
        </div>
      </motion.div>

      {/* 🏅 Top Contributors */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className=" px-6 mb-15"
      >
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-2 mb-8">
          <FaMedal className="text-yellow-400" /> Top Contributors
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topContributors.length > 0 ? (
            topContributors.map((contributor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6  rounded-xl shadow-sm hover:shadow-md  transition"
              >
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="w-20 h-20 mx-auto rounded-full mb-3 border-2 border-primary object-cover"
                />
                <h3 className="text-lg font-bold text-center mb-1 text-primary">
                  {contributor.name}
                </h3>
                <p className="text-center text-gray-500 text-sm mb-2">
                  {contributor.posts} Posts • {contributor.votes} Votes
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No contributors yet.</p>
          )}
        </div>
      </motion.div>

      {/* 💬 Recent Discussions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className=" mx-auto px-6"
      >
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-2 mb-8">
          <FaComments className="text-blue-500" /> Recent Discussions
        </h2>
        <div className="space-y-5">
          {recentPosts.length > 0 ? (
            recentPosts.map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col md:flex-row items-start justify-between p-5 shadow-sm  rounded-xl hover:shadow-md transition "
              >
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    by{" "}
                    <span className="text-primary font-medium">
                      {post.authorName}
                    </span>{" "}
                    • {post.timeAgo || "recently"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    #{post.tag}
                  </span>
                  <Link to={`/posts/${post._id}`} className="flex items-center gap-1 text-primary font-medium hover:text-secondary transition">
                    View <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No posts yet.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityPage;
