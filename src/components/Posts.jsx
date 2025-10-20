// Posts.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../hooks/api";
import Loading from "./Loading";
import axios from "axios";
import { Link } from "react-router";

const fetchPosts = async ({ page, sortBy }) => {
  const res = await api.get("/posts", {
    params: { page, limit: 5, sortBy },
  });
  return res.data;
};

const Posts = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest"); // newest | popularity

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts", page, sortBy],
    queryFn: () => fetchPosts({ page, sortBy }),
    keepPreviousData: true,
  });

  return (
    <div className="w-6xl mx-auto px-6 pt-15">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
        <h2 className="text-2xl font-semibold text-primary">Posts</h2>
        <button
          onClick={() => {
            setSortBy(sortBy === "newest" ? "popularity" : "newest");
            setPage(1);
            refetch();
          }}
          className="px-4 py-2 bg-primary text-base-100 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {sortBy === "newest" ? "Sort by Popularity" : "Sort by Newest"}
        </button>
      </div>

      {/* Posts List */}
      {isLoading && <Loading></Loading>}
      {isError && (
        <div className="text-center py-10 text-red-500">
          Failed to load posts
        </div>
      )}

      <div className="grid gap-4">
        {data?.data?.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <div className="bg-base-100 text-secondary shadow-md rounded-xl p-4 flex flex-col sm:flex-row gap-4">
              {/* Author Image */}
              <img
                src={post.authorImage || "/default-avatar.png"}
                alt={post.authorName}
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {post.authorName} •{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    
                    <p className="text-sm font-semibold text-accent">
                      Votes: {post.voteDifference}
                    </p>
                    <p className="text-xs text-accent font-semibold text-nowrap">
                      {post.commentsCount} comments
                    </p>
                  </div>
                </div>

                <p className="mt-2 line-clamp-3">{post.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full">
                    {post.tag}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {data && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            className="px-4 py-2 bg-primary text-base-100 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-20"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {data.currentPage} of {data.totalPages}
          </span>
          <button
            className="px-4 py-2 bg-primary text-base-100 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-20"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
