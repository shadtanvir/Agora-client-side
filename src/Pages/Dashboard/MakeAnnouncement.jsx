import { useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { use } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useTitle from "../../hooks/useTitle";

const MakeAnnouncement = () => {
  useTitle("Make Announcement");
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: async (announcement) => {
      return await axiosSecure.post("/announcements", announcement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire("Success!", "Announcement has been posted.", "success");
      setForm({ title: "", description: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire(
        "Error",
        "You must be logged in to post an announcement.",
        "error"
      );
      return;
    }

    const announcement = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      title: form.title,
      description: form.description,
    };

    mutation.mutate(announcement);
  };

  return (
    <>
      <h2 className="text-2xl mt-10 font-bold mb-8 text-primary">Make Announcement</h2>
      <div className="max-w-6xl  mb-10 p-6 shadow-md rounded-lg ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary text-base-300 w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MakeAnnouncement;
