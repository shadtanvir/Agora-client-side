import React, { useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useTitle from "../../hooks/UseTitle";

const feedbackOptions = [
  "Spam or Irrelevant",
  "Harassment or Abusive",
  "Misinformation",
];

const Comments = () => {
  useTitle("Post Comments");
  const { postId } = useParams();
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const [selectedComment, setSelectedComment] = useState(null);
  const [page, setPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState({});

  const limit = 5;

  // Fetch comments with TanStack Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/comments/${postId}?page=${page}&limit=${limit}`
      );
      return res.data || { comments: [], total: 0 };
    },
    enabled: !!postId,
    keepPreviousData: true,
  });

  const comments = data?.comments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Handle feedback change
  const handleFeedbackChange = (commentId, value) => {
    setFeedbacks((prev) => ({ ...prev, [commentId]: value }));
  };

  // Handle report
  const handleReport = async (commentId) => {
    const feedback = feedbacks[commentId];
    if (!feedback) return toast.error("Please select feedback first!");

    try {
      const res = await axiosSecure.patch(
        `/comments/report/${commentId}?email=${user.email}`,
        { feedback }
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Comment reported successfully!");
      }
    } catch (err) {
      toast.error("Failed to report comment.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="max-w-5xl mx-auto my-10 text-center text-red-600">
        <p>Failed to load comments. Try again later.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto my-10 p-4 font-inter">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary font-poppins">
          Comments on Post
        </h2>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-200 font-poppins text-green-800">
            <tr className="text-primary font-semibold">
              <th>#</th>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => {
              const truncated =
                comment.text.length > 20
                  ? comment.text.substring(0, 20) + "..."
                  : comment.text;

              return (
                <tr key={comment._id} className="bg-base-100">
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td className="font-medium">{comment.userEmail}</td>
                  <td>
                    {truncated}
                    {comment.text.length > 20 && (
                      <button
                        onClick={() => setSelectedComment(comment)}
                        className="text-blue-500 ml-2 underline"
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={feedbacks[comment._id] || ""}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                      disabled={comment.reported}
                    >
                      <option value="">Select Feedback</option>
                      {feedbackOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      disabled={!feedbacks[comment._id] || comment.reported}
                      onClick={() => handleReport(comment._id)}
                    >
                      {comment.reported ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {comments.length === 0 && (
          <div className="text-center py-6 text-gray-500">No comments yet.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            « Prev
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next »
          </button>
        </div>
      )}

      {/* Read More Modal */}
      {selectedComment && (
        <dialog id="comment_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-primary">Full Comment</h3>
            <p className="py-4">{selectedComment.text}</p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedComment(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Comments;
