import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  ThumbsUp,
  ThumbsDown,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircle,
} from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useTitle from "../hooks/UseTitle";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import UseUser from "../hooks/UseUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostDetails = () => {
  useTitle("Post Details");
  const { user } = React.useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { userDb } = UseUser();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const shareUrl = `${window.location.origin}/post/${id}`;

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

  // ✅ Vote mutation with optimistic updates
  const voteMutation = useMutation({
    mutationFn: async ({ type }) => {
      const res = await axiosSecure.patch(
        `/posts/${id}/vote?email=${user.email}&type=${type}`
      );
      return res.data;
    },
    onMutate: async ({ type }) => {
      if (!post) return;

      // cancel ongoing queries
      await queryClient.cancelQueries(["post", id]);

      // snapshot previous
      const previous = { ...post };

      let newUp = post.upVote;
      let newDown = post.downVote;
      let newVotes = [...(post.votes || [])];

      const existing = newVotes.find((v) => v.email === user.email);

      if (!existing) {
        // first vote
        type === "upvote" ? newUp++ : newDown++;
        newVotes.push({ email: user.email, type });
      } else if (existing.type === type) {
        // remove same vote
        type === "upvote" ? newUp-- : newDown--;
        newVotes = newVotes.filter((v) => v.email !== user.email);
      } else {
        // switch vote
        if (type === "upvote") {
          newUp++;
          newDown--;
        } else {
          newDown++;
          newUp--;
        }
        newVotes = newVotes.filter((v) => v.email !== user.email);
        newVotes.push({ email: user.email, type });
      }

      setPost({ ...post, upVote: newUp, downVote: newDown, votes: newVotes });

      return { previous };
    },
    onError: (err, _, context) => {
      if (context?.previous) {
        setPost(context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  const handleVote = (type) => {
    if (userDb?.banned) {
      Swal.fire("Account Banned", "You cannot vote!", "error");
      return;
    }
    voteMutation.mutate({ type });
  };

  const handleComment = async () => {
      if (userDb?.banned) {
      Swal.fire("Account Banned", "You cannot comment!", "error");
      return;
    }
    if (!comment.trim()) return;
    try {
      const res = await axiosSecure.post(
        `/posts/${id}/comments?email=${user.email}`,
        {
          userId: userDb._id,
          userName: userDb.name,
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

  if (!post) return <Loading />;

  const hasVoted = post.votes?.find((v) => v.email === user?.email);
  const userVoteType = hasVoted?.type;

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
            disabled={voteMutation.isLoading}
            className={`flex items-center gap-1 ${
              userVoteType === "upvote"
                ? "text-green-800 font-bold"
                : "text-green-600"
            }`}
          >
            {userVoteType === "upvote" ? (
              <ThumbsUpIcon size={20} fill="currentColor" />
            ) : (
              <ThumbsUp size={20} />
            )}
            {post.upVote}
          </button>

          <button
            onClick={() => handleVote("downvote")}
            disabled={voteMutation.isLoading}
            className={`flex items-center gap-1 ${
              userVoteType === "downvote"
                ? "text-red-800 font-bold"
                : "text-red-600"
            }`}
          >
            {userVoteType === "downvote" ? (
              <ThumbsDownIcon size={20} fill="currentColor" />
            ) : (
              <ThumbsDown size={20} />
            )}
            {post.downVote}
          </button>

          {/* Share buttons */}

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-base-100 text-secondary rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <MessageCircle size={20} /> Comments
        </h3>

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
            // disabled={userDb?.banned}
            className="px-4 py-2 bg-primary text-base-100 rounded"
          >
            {user ? "Comment" : "Login to comment"}
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
