import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import bronze_badge from "../../assets/bronze_badge.png";
import gold_badge from "../../assets/gold_badge.png";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  // Use TanStack Query to fetch user + recentPosts
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load profile.</p>
        <p className="text-sm text-gray-500">{error?.message}</p>
      </div>
    );
  }

  // Keep same variable names as before for minimal change
  const profile = profileData || {};
  const { user: userData = null, recentPosts = [] } = profile;

  if (!userData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-primary font-semibold mb-6">My Profile</h2>

      {/* User Info */}
      <div className="flex items-center gap-6 bg-base-300 p-6 rounded-lg shadow">
        <img
          src={userData.photoURL || "/default-avatar.png"}
          alt="User avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-xl text-primary font-bold">{userData.name}</h3>
          <p className="text-secondary">{userData.email}</p>

          {/* Badge */}
          <div className="mt-3 flex items-center gap-3">
            {userData.badge === "bronze" && (
              <span className="inline-flex items-center py-1 rounded-full text-sm font-medium">
                <img src={bronze_badge} alt="Bronze" className="w-15 h-15" />
              </span>
            )}
            {userData.badge === "gold" && (
              <span className="inline-flex items-center py-1">
                <img src={gold_badge} alt="Gold" className="w-12 h-17" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-8">
        <h3 className="text-3xl text-primary font-semibold mb-4">
          My Recent Posts
        </h3>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet</p>
        ) : (
          <div className="grid gap-4">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="p-4 border-primary rounded-lg shadow-sm"
              >
                <h4 className="font-semibold text-primary text-lg">{post.title}</h4>
                <p className=" text-sm line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-2 text-xs text-secondary  flex justify-between">
                  <span>Tag: {post.tag}</span>
                  <span>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US")
                      : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
