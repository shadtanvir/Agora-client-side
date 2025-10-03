import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const bannerSlides = [
  {
    title: "Connect, Discuss, Grow",
    subtitle: "Find posts by tag — discover knowledge from the community.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Share Ideas",
    subtitle: "Post, comment, and vote — make your voice count.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Learn Together",
    subtitle: "Browse tags to find topics you care about.",
    image:
      "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=1600&q=60",
  },
];

const ResultCard = ({ post }) => {
  return (
    <Link key={post._id} to={`/posts/${post._id}`}>
      <article className="bg-base-100 shadow-sm rounded-lg p-4 flex  gap-4">
        <img
          src={post.authorImage || "/default-avatar.png"}
          alt={post.authorName || "Author avatar"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                {post.title}
              </h3>
              <div className="text-xs text-secondary mt-1">
                by <span className="font-medium">{post.authorName}</span> •{" "}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : ""}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-accent">
                Votes:
                {(post.upVote || 0) - (post.downVote || 0)}
              </div>
              <div className="text-xs text-accent font-semibold mt-1 text-nowrap">
                {post.commentsCount || 0} comments
              </div>
            </div>
          </div>mc
mc          <div className="flex flex-wrap gap-2 mt-3">
            {post.tag && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                {post.tag}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-secondary line-clamp-3">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // 🔹 Fetch tags with TanStack
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get(
        "https://agora-shadtanvir-server.vercel.app/tags"
      );
      return res.data;
    },
  });

  // Fetch posts with TanStack (search + pagination)
  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: async () => {
      const endpoint =
        query && query.trim().length > 0
          ? `https://agora-shadtanvir-server.vercel.app/search/posts?q=${encodeURIComponent(
              query
            )}&page=${page}&limit=${limit}`
          : `https://agora-shadtanvir-server.vercel.app/posts?page=${page}&limit=${limit}`;

      const res = await axios.get(endpoint);
      return res.data;
    },
    keepPreviousData: true,
  });

  const results = postsData?.data || [];
  const totalPages = postsData?.totalPages || 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="w-full overflow-hidden font-poppins">
      <Slider {...settings}>
        {bannerSlides.map((slide, index) => (
          <div key={index} className="relative h-[520px] md:h-[640px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-4"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typewriter
                  words={[slide.title]}
                  loop={false}
                  cursor
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={800}
                />
              </motion.h1>
              <motion.p
                className="text-md md:text-lg font-inter max-w-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Search box */}
              <motion.div
                className="mt-8 w-full max-w-2xl px-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center bg-base-100 rounded-lg shadow overflow-hidden border"
                >
                  <input
                    type="text"
                    placeholder="Search by tags (e.g. react, node, mongodb)..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-4 py-3 text-primary placeholder:text-secondary bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 font-semibold transition bg-indigo-600 text-white"
                  >
                    Search
                  </button>
                </form>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {tags.slice(0, 12).map((t) => {
                    const name = t?.name || t;
                    return (
                      <button
                        key={name}
                        onClick={() => {
                          setQuery(name);
                          setPage(1);
                        }}
                        className={`text-sm px-3 py-1 rounded-full border ${
                          query === name
                            ? "bg-indigo-600 text-white"
                            : "text-indigo-600 border-indigo-200"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Results area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary">
            {query ? `Results for "${query}"` : "Latest posts"}
          </h2>
          <div className="text-sm text-secondary">
            {isLoading
              ? "Loading..."
              : `${results.length} result${results.length !== 1 ? "s" : ""}`}
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading && <div className="text-center">Loading posts...</div>}
          {isError && <div className="text-center ">Error loading posts</div>}
          {!isLoading && results.length === 0 && (
            <div className="text-center py-8 text-secondary">
              No posts found. Try another tag!
            </div>
          )}
          {!isLoading &&
            results.map((p) => <ResultCard key={p._id} post={p} />)}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            className="btn "
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <div className="text-sm text-secondary">
            Page {page} of {totalPages}
          </div>
          <button
            className="btn "
            onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
