import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../components/Loading";

const ReportedComments = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch reported comments
  const { data: reported = [], isLoading } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported/comments");
      return res.data;
    },
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

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Reported Comments
      </h2>
      {reported.length === 0 ? (
        <p className="text-gray-500 text-center">No reported comments 🚀</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="table w-full text-sm">
            <thead className="bg-red-200 font-semibold text-red-700">
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
              {reported.map((comment, idx) => (
                <tr key={comment._id} className="bg-base-100">
                  <td>{idx + 1}</td>
                  <td>{comment.userName}</td>
                  <td>{comment.userEmail}</td>
                  <td className="max-w-xs truncate">{comment.text}</td>
                  <td className="text-red-600 font-medium">
                    {comment.feedback}
                  </td>
                  <td>{new Date(comment.createdAt).toLocaleString()}</td>
                  <td className="space-x-2">
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
      )}
    </div>
  );
};

export default ReportedComments;
