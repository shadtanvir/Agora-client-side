import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { VscCommentDiscussion } from "react-icons/vsc";
import { SlLike } from "react-icons/sl";

import { BiRepost } from "react-icons/bi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import useTitle from "../../hooks/UseTitle";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

const UserOverview = () => {
  useTitle("User Overview");
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // Fetch user stats

  const { data: stats = { posts: 0, comments: 0, likes: 0 } } = useQuery({
    queryKey: ["userOverview", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/overview?email=${user.email}`);
      return res.data;
    },
  });

  const pieData = [
    { name: "Posts", value: stats.posts },
    { name: "Comments", value: stats.comments },
    { name: "Likes", value: stats.likes },
  ];

  return (
    <div className="max-w-6xl mx-auto my-10 p-6  rounded-2xl shadow-lg space-y-8">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow-lg transition-transform transform hover:scale-105"
        />
        <div className="flex-1 text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-bold text-primary">
            {user?.displayName}
          </h2>
          <p className="text-secondary">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#4CAF50] flex justify-center items-center gap-2 ">
            <BiRepost className="" /> Posts
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#4CAF50]">
            {stats.posts}
          </h3>
        </div>
        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#2196F3] flex justify-center items-center gap-2 ">
            <VscCommentDiscussion className="text-[#2196F3]" /> Comments
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#2196F3]">
            {stats.comments}
          </h3>
        </div>
        
        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#ff9800] flex justify-center items-center gap-2 ">
            <VscCommentDiscussion className="" /> Likes
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#ff9800]">
            {stats.likes}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-80 bg-base-100 rounded-xl shadow p-4 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Posts */}
      <div className="bg-base-100 rounded-xl shadow p-4">
        <h3 className="text-lg font-bold text-primary mb-3">Recent Posts</h3>
        {stats.recentPosts?.length ? (
          <ul className="space-y-2">
            {stats.recentPosts.map((post) => (
              <li key={post._id} className="p-2 rounded-md  transition">
                <p className="text-primary">{post.title}</p>
                <p className="text-gray-500 text-sm">
                  {post.description.slice(0, 80)}...
                </p>
                <p className="text-primary  text-xs">Tag: {post.tag}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>

      {/* Recent Comments */}
      <div className="bg-base-100 rounded-xl shadow p-4">
        <h3 className="text-lg font-bold text-primary mb-3">Recent Comments</h3>
        {stats.recentComments?.length ? (
          <ul className="space-y-2">
            {stats.recentComments.map((cmt) => (
              <li key={cmt._id} className="p-2 rounded-md transition">
                <p className="text-primary">{cmt.text}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(cmt.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserOverview;
