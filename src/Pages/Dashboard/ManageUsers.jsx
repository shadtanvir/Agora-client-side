import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/Loading";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);

  // Two states: one for input box, one for active search
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", search], // re-fetch only when `search` changes
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Mutation: Make Admin
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/users/make-admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeAdmin = (id) => {
    makeAdminMutation.mutate(id);
  };

  // Submit handler for search form
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput); // update query with final input
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-4 font-inter">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary font-poppins">
          Manage Users
        </h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary text-base-300">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-300 font-poppins text-green-800">
            <tr className="text-primary font-semibold">
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="bg-base-100">
                <td>{index + 1}</td>
                <td className="font-medium">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role || "user"}</td>
                <td>{u.membership || "Free"}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(u._id)}
                      className="btn btn-sm btn-primary text-base-300"
                      disabled={makeAdminMutation.isLoading}
                    >
                      {makeAdminMutation.isLoading
                        ? "Updating..."
                        : "Make Admin"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-6 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
