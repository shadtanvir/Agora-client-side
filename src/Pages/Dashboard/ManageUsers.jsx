import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import useTitle from "../../hooks/UseTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5; // users per page

  // Fetch users
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // Mutation: Make Admin
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/users/make-admin/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Done!", "User is Admin now", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Mutation: Ban / Unban
  const toggleBanMutation = useMutation({
    mutationFn: async ({ id, banned }) => {
      await axiosSecure.patch(`/users/${id}/ban`, { banned });
    },
    onSuccess: () => {
      Swal.fire("Done!", "User is updated", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeAdmin = (id) => {
    makeAdminMutation.mutate(id);
  };

  const handleToggleBan = (id, banned) => {
    toggleBanMutation.mutate({ id, banned: !banned });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1); // reset to first page when searching
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users</p>;

  return (
    <div className="max-w-4xl mx-auto my-10  font-inter">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary font-poppins">
          Manage Users
        </h2>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col md:flex-row justify-center gap-2"
      >
        <input
          type="text"
          placeholder="Search by username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full "
        />
        <button
          type="submit"
          className="btn btn-primary text-center text-base-300"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto  shadow-lg rounded-lg border border-green-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-300 font-poppins ">
            <tr className="text-primary font-semibold">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Subscription</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="bg-base-100 hover:bg-base-300">
                <td className="py-2 px-4">{(page - 1) * limit + index + 1}</td>
                <td className=" py-2 px-4 font-medium">{u.name}</td>
                <td className="py-2 px-4 break-words">{u.email}</td>
                <td className="py-2 px-4">{u.badge || "bronze"}</td>
                <td className="py-2 px-4 flex flex-col md:flex-row gap-2">
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

                  <button
                    onClick={() => handleToggleBan(u._id, u.banned)}
                    className={`btn btn-sm ${
                      u.banned
                        ? "btn-success text-white"
                        : "btn-error text-white"
                    }`}
                    disabled={toggleBanMutation.isLoading}
                  >
                    {toggleBanMutation.isLoading
                      ? "Processing..."
                      : u.banned
                      ? "Unban"
                      : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-6 text-gray-500">No users found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
