import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const feedbackOptions = [
  "Spam or Irrelevant",
  "Harassment or Abusive",
  "Misinformation",
];

const Comments = () => {
  const { postId } = useParams();
  const { user } = use(AuthContext);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null); // For modal
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/comments/${postId}`).then((res) => setComments(res.data));
  }, [postId, axiosSecure, user]);

  const handleReport = async (commentId, feedback) => {
    try {
      const res = await axiosSecure.patch(
        `/comments/report/${commentId}?email=${user.email}`,
        {
          feedback,
        }
      );
      if (res.data.modifiedCount > 0) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? { ...c, reported: true } : c))
        );
        toast.success("Comment reported successfully!");
      }
    } catch (err) {
      toast.error("Failed to report comment.");
    }
  };

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
                  <td>{index + 1}</td>
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
                      value={comment.feedback || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setComments((prev) =>
                          prev.map((c) =>
                            c._id === comment._id
                              ? { ...c, feedback: value }
                              : c
                          )
                        );
                      }}
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
                      disabled={!comment.feedback || comment.reported}
                      onClick={() =>
                        handleReport(comment._id, comment.feedback)
                      }
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
