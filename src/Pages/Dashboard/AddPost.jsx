import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";
import UseUser from "../../hooks/UseUser";
import Swal from "sweetalert2";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [postCount, setPostCount] = useState(0);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { userDb, loading, error } = UseUser();
  console.log(userDb);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/posts/count/${user.email}`)
        .then((res) => setPostCount(res.data.count));
    }
  }, [user]);
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/tags`).then((res) => setTags(res.data));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      authorEmail: user.email,
      title: form.title.value,
      description: form.description.value,
      tag: form.tag.value,
    };

    await axios.post("http://localhost:5000/posts", newPost);
    alert("Post added successfully!");
    form.reset();
    navigate("/dashboard/my-posts");
  };

  if (postCount >= 5) {
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
  if (userDb?.banned) {
    Swal.fire(
      "Account Banned",
      "You have been banned from this forum.",
      "error"
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

          {tags.map((tag, index) => (
            <option key={index} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
        <button
          disabled={userDb?.banned}
          type="submit"
          className="btn btn-primary text-base-100 w-full"
        >
          Share Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
