import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { FaTrashAlt, FaCommentDots } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const MyPosts = () => {
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary font-poppins">
          My Posts
        </h2>
        <p className="text-gray-500">Manage all your posts here.</p>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-300 font-poppins text-green-800">
            <tr className="text-primary font-semibold">
              <th>#</th>
              <th>Title</th>
              <th>Votes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="bg-base-100">
                <td className="py-2 px-4">{(page - 1) * limit + index + 1}</td>
                <td className="py-2 px-4 font-semibold text-primary">
                  {post.title}
                </td>
                <td className="py-2 px-4">{post.upVote - post.downVote}</td>
                <td className="flex gap-2 py-2 px-4">
                  <Link
                    to={`/dashboard/comments/${post._id}?email=${user.email}`}
                  >
                    <button className="btn btn-sm btn-info flex items-center gap-1">
                      <FaCommentDots /> Comment
                    </button>
                  </Link>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && posts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            You haven’t posted anything yet.
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 py-4">
            <button
              className="btn btn-sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`btn btn-sm ${
                  page === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {selectedPost && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box bg-base-200">
            <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-primary">
                {selectedPost.title}
              </span>{" "}
              ? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={confirmDelete}
                className="btn btn-error text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPosts;
