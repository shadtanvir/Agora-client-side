import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";
import UseUser from "../../hooks/UseUser";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useTitle from "../../hooks/UseTitle";

const AddPost = () => {
  useTitle("Add Post");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { userDb, loading: userLoading } = UseUser();

  // Fetch post count with react-query
  const {
    data: postCount = 0,
    isLoading: postCountLoading,
    isError: postCountError,
  } = useQuery({
    queryKey: ["postsCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/posts/count/${user.email}`
      );
      // endpoint returns { count }
      return res.data.count ?? 0;
    },
    staleTime: 1000 * 60, // optional: 1min
  });

  // Fetch tags with react-query
  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tags");
      return res.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  // local input state not required because using form elements, but keep postCount as local
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Block banned users early
    if (userDb?.banned) {
      Swal.fire("Account Banned", "You cannot share a post.", "error");
      return;
    }

    const form = e.target;
    const title = form.title.value?.trim();
    const description = form.description.value?.trim();
    const tag = form.tag.value;

    if (!title || !description || !tag) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    const newPost = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      authorEmail: user.email,
      title,
      description,
      tag,
    };

    try {
      setSubmitting(true);
      // Use axiosSecure (which adds Firebase token)
      await axiosSecure.post("/posts", newPost);
      Swal.fire("Post Shared!", "Your post is shared to the forum", "success");
      form.reset();
      navigate("/dashboard/my-posts");
    } catch (err) {
      Swal.fire("Error", "Failed to share post. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading / error handling for queries (keep simple)
  if (postCountLoading || tagsLoading || userLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <Loading></Loading>
      </div>
    );
  }

  if (postCountError || tagsError) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-red-600">
        <p>Failed to load required data. Refresh the page.</p>
      </div>
    );
  }

  // Restrict free users with bronze badge to 5 posts
  if (postCount >= 5 && userDb?.badge === "bronze") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-500">
          You have reached the maximum post limit (5 posts).
        </h2>
        <p className="mt-3">Become a member to unlock unlimited posting.</p>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary mt-5"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl text-primary font-bold mb-6">Add New Post</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-base-300 p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Post Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <select name="tag" className="select select-bordered w-full" required>
          <option value="">Select a tag</option>
          {tags.map((tagObj, index) => {
            // tagObj could be { name: "React" } or string; handle both
            const name = tagObj?.name ?? tagObj;
            return (
              <option key={index} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="btn btn-primary text-base-100 w-full"
          disabled={submitting}
        >
          {submitting ? "Sharing..." : "Share Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
