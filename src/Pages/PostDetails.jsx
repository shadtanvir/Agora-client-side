import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { ThumbsUp, ThumbsDown, Share2, MessageCircle } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useTitle from "../hooks/UseTitle";

const PostDetails = () => {
  useTitle("Post Details");
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();

  const shareUrl = `${window.location.origin}/post/${id}`;

  // fetch user from DB
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${user.email}`
        );
        const { user: dbUser } = res.data;
        setDbUser(dbUser); // store it in state
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);
  // fetch post details
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleVote = async (type) => {
    try {
      await axiosSecure.patch(`/posts/${id}/${type}?email=${user.email}`);
      setPost((prev) => ({
        ...prev,
        [type === "upvote" ? "upVote" : "downVote"]:
          prev[type === "upvote" ? "upVote" : "downVote"] + 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axiosSecure.post(
        `/posts/${id}/comments?email=${user.email}`,
        {
          userId: dbUser._id, // replace with logged in user id
          userName: dbUser.name, // replace with logged in user name
          text: comment,
        }
      );
      setPost((prev) => ({
        ...prev,
        comments: [res.data.comment, ...(prev.comments || [])],
      }));
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Post details */}
      <div className="bg-base-100 text-secondary rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">{post.authorName}</h4>
            <span className="text-xs ">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-primary">{post.title}</h2>
        <p className="t mb-3">{post.description}</p>
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">
          {post.tag}
        </span>

        {/* Actions */}
        <div className="flex gap-4 items-center mt-5">
          <button
            onClick={() => handleVote("upvote")}
            className="flex items-center gap-1 text-green-600"
          >
            <ThumbsUp size={18} /> {post.upVote}
          </button>
          <button
            onClick={() => handleVote("downvote")}
            className="flex items-center gap-1 text-red-600"
          >
            <ThumbsDown size={18} /> {post.downVote}
          </button>

          {/* Share buttons */}
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} title={post.title}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-base-100 text-secondary rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <MessageCircle size={20} /> Comments
        </h3>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Comment
          </button>
        </div>

        {/* List of comments */}
        <div className="space-y-3">
          {(post.comments || []).map((c, idx) => (
            <div key={idx} className="border-b pb-2">
              <p className="text-sm">
                <span className="font-semibold">{c.userName}</span>: {c.text}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
          {(!post.comments || post.comments.length === 0) && (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
