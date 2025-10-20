import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import { VscCommentDiscussion } from "react-icons/vsc";
import { BiRepost } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];
const AdminProfile = () => {
  useTitle("Admin Profile");
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [tagName, setTagName] = useState("");

  // Fetch stats
  const { data: stats = { posts: 0, comments: 0, users: 0 } } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // Fetch tags
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  // Add tag mutation
  const mutation = useMutation({
    mutationFn: async (newTag) => {
      return await axiosSecure.post("/tags", newTag);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      Swal.fire("Success!", "Tag added successfully.", "success");
      setTagName("");
    },
  });

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagName) return;
    mutation.mutate({ name: tagName });
  };

  // Prepare pie data
  const pieData = [
    { name: "Posts", value: stats.posts },
    { name: "Comments", value: stats.comments },
    { name: "Users", value: stats.users },
  ];

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 shadow-lg rounded-xl">
      {/* Admin Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-20 h-20 rounded-full shadow-md"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {user?.displayName}
          </h2>
          <p className="text-secondary text-sm sm:text-base">{user?.email}</p>
        </div>
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#2196F3] flex justify-center items-center gap-2 ">
            <VscCommentDiscussion className="text-[#2196F3]" /> Comments
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#2196F3]">
            {stats.comments}
          </h3>
        </div>
        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#4CAF50] flex justify-center items-center gap-2 ">
            <BiRepost className="" /> Posts
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#4CAF50]">
            {stats.posts}
          </h3>
        </div>

        <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#ff9800] flex justify-center items-center gap-2 ">
            <FaUsers /> Users
          </h2>{" "}
          <h3 className="text-2xl text-center font-bold text-[#ff9800]">
            {stats.users}
          </h3>
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto mt-6">
        <PieChart
          width={300}
          height={250}
          className="sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[400px]"
        >
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Add Tag Form */}
      <div className="mt-10">
        <h3 className=" text-xl font-bold mb-2 text-primary">Add New Tag</h3>
        <form
          onSubmit={handleAddTag}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Tag Name"
            className="input input-bordered p-3 flex-1"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary text-base-300">
            Add Tag
          </button>
        </form>

        {/* Display Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag._id}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
