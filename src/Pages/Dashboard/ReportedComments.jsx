import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../components/Loading";
import { useState } from "react";
import useTitle from "../../hooks/UseTitle";

const ReportedComments = () => {
  useTitle("Reported Comments");
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 5;

  // Fetch reported comments
  const { data, isLoading } = useQuery({
    queryKey: ["reportedComments", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reported/comments?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reportedComments"]);
      Swal.fire("Deleted!", "Comment removed.", "success");
    },
  });

  const dismissMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/comments/dismiss/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reportedComments"]);
      Swal.fire("Dismissed!", "Report cleared.", "info");
    },
  });

  const banMutation = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/ban/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reportedComments"]);
      Swal.fire("Banned!", "User banned from the forum.", "error");
    },
  });

  if (isLoading) return <Loading />;

  const comments = data?.comments || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Reported Comments
      </h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">No reported comments </p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="table w-full text-sm">
              <thead className="bg-blue-300 font-poppins text-primary">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Comment</th>
                  <th>Feedback</th>
                  <th>Reported On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment, idx) => (
                  <tr key={comment._id} className="bg-base-100 hover:bg-base-300">
                    <td>{(page - 1) * limit + idx + 1}</td>
                    <td>{comment.userName}</td>
                    <td>{comment.userEmail}</td>
                    <td className="max-w-xs truncate">{comment.text}</td>
                    <td className="text-error font-medium">
                      {comment.feedback}
                    </td>
                    <td>{new Date(comment.createdAt).toLocaleString()}</td>
                    <td className="flex gap-1 items-center justify-center">
                      <Link
                        to={`/posts/${comment.postId}`}
                        className="btn btn-xs btn-info"
                      >
                        View Post
                      </Link>
                      <button
                        onClick={() => deleteMutation.mutate(comment._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => dismissMutation.mutate(comment._id)}
                        className="btn btn-xs btn-warning"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => banMutation.mutate(comment.userId)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Ban User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </>
      )}
    </div>
  );
};

export default ReportedComments;
