import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const fetchTags = async () => {
  const res = await fetch("https://agora-shadtanvir-server.vercel.app/tags"); // backend endpoint
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

const TagsSection = ({ onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  return (
    <div className="w-full py-6 bg-base-100 shadow-sm rounded-xl">
      <h2 className="text-xl md:text-2xl text-primary font-semibold mb-4 text-center">
        Tags
      </h2>

      {isLoading && <Loading></Loading>}
      {isError && <p className="text-center text-error">Failed to load tags</p>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 px-4">
          {tags.map((t, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              className="w-full px-3 py-2 rounded-full text-sm font-medium border transition text-center truncate
                     text-primary hbg-blue-100 border-gray-300"
            >
              #{t.name || t}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsSection;
