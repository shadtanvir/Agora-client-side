import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { FaTrashAlt, FaCommentDots } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useTitle from "../../hooks/useTitle";

const MyPosts = () => {
  useTitle("My Posts");
  const { user, loading } = useContext(AuthContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const axiosSecure = UseAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myPosts", user?.email, page],
    queryFn: async () => {
      if (!user?.email) return { posts: [], total: 0 };
      const res = await axiosSecure.get(
        `/posts/by-user?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data || { posts: [], total: 0 };
    },
    enabled: !loading && !!user?.email,
  });

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const confirmDelete = async () => {
    if (!selectedPost) return;
    try {
      const res = await axiosSecure.delete(
        `/posts/${selectedPost._id}?email=${user.email}`
      );
      if (res.data.deletedCount > 0) {
        toast.success("Post deleted successfully!");
        setSelectedPost(null);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete post.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 font-inter">
      <div className="mb-8">
        <h2 className="text-2xl  font-bold text-primary font-poppins">
          My Posts
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Manage all your posts here.
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full text-xs sm:text-sm">
          <thead className="bg-blue-300 font-poppins text-green-800">
            <tr className="text-primary font-semibold text-xs sm:text-sm">
              <th className="p-2 sm:p-4">#</th>
              <th className="p-2 sm:p-4">Title</th>
              <th className="p-2 sm:p-4">Votes</th>
              <th className="p-2 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post._id}
                className="bg-base-100 hover:bg-base-300 transition"
              >
                <td className="py-2 px-2 sm:px-4">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="py-2 px-2 sm:px-4 font-semibold text-primary break-words max-w-[150px] sm:max-w-none">
                  {post.title}
                </td>
                <td className="py-2 px-2 sm:px-4">
                  {post.upVote - post.downVote}
                </td>
                <td className="flex flex-col sm:flex-row gap-2 py-2 px-2 sm:px-4">
                  <Link
                    to={`/dashboard/comments/${post._id}?email=${user.email}`}
                    className="flex-1 sm:flex-initial"
                  >
                    <button className="btn btn-xs sm:btn-sm btn-info w-full sm:w-auto flex items-center gap-1">
                      <FaCommentDots /> Comment
                    </button>
                  </Link>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="btn btn-xs sm:btn-sm btn-error w-full sm:w-auto flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && posts.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm sm:text-base">
            You haven’t posted anything yet.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-4 text-sm sm:text-base">
          <button
            className="btn btn-xs sm:btn-sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-2 sm:px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-xs sm:btn-sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
