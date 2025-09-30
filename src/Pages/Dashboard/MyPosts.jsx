import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaTrashAlt, FaCommentDots } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { user, loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/posts/by-user?email=${user.email}`)
        .then((res) => setPosts(res.data));
    }
  }, [loading, user, axiosSecure]);

  // Delete handler
  const confirmDelete = async () => {
    if (!selectedPost) return;
    try {
      const res = await axiosSecure.delete(
        `/posts/${selectedPost._id}?email=${user.email}`
      );
      if (res.data.deletedCount > 0) {
        setPosts((prev) =>
          prev.filter((post) => post._id !== selectedPost._id)
        );
        toast.success("Post deleted successfully!");
        setSelectedPost(null);
      }
    } catch (err) {
      toast.error("Failed to delete post.");
    }
  };

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
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 font-semibold text-primary">
                  {post.title}
                </td>
                <td className="py-2 px-4">{post.upVote - post.downVote}</td>
                <td className="flex gap-2 py-2 px-4">
                  <Link to={`/post/${post._id}`}>
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
