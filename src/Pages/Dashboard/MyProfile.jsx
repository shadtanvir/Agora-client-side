import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import bronze_badge from "../../assets/bronze_badge.png";
import gold_badge from "../../assets/gold_badge.png";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../hooks/useTitle";

const MyProfile = () => {
  useTitle("Profile");
  const { user } = useContext(AuthContext);

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://agora-shadtanvir-server.vercel.app/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load profile.</p>
        <p className="text-sm text-gray-500">{error?.message}</p>
      </div>
    );
  }

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
    <div className="mt-10">
      <h2 className="text-2xl text-primary font-semibold mb-6">My Profile</h2>

      {/* User Profile Card */}
      <div className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
        {/* Avatar + Badge */}
        <div className="relative flex-shrink-0">
          <img
            src={userData.photoURL || "/default-avatar.png"}
            alt="User avatar"
            className="w-28 h-28 rounded-full object-cover border-2 border-primary transition-transform transform hover:scale-105"
          />
          {/* Badge Overlay */}
          {userData.badge && (
            <div className="absolute -bottom-2 -right-2">
              <img
                src={userData.badge === "gold" ? gold_badge : bronze_badge}
                alt={`${userData.badge} badge`}
                className="w-12 h-12 animate-bounce"
              />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold text-primary">{userData.name}</h2>
          <p className="text-gray-500 break-words">{userData.email}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-sm text-gray-500">
            <div>
              <span className="font-semibold text-primary">Phone:</span>{" "}
              {userData.phone || "Not provided"}
            </div>
            <div>
              <span className="font-semibold text-primary">Address:</span>{" "}
              {userData.address || "Unknown"}
            </div>
            <div>
              <span className="font-semibold text-primary">Profession:</span>{" "}
              {userData.profession || "Community Member"}
            </div>
            <div>
              <span className="font-semibold text-primary">Bio:</span>{" "}
              {userData.bio || "Excited to be part of Agora!"}
            </div>
          </div>

          {/* Optional: Progress / Rank Bar */}
          {userData.badge && (
            <div className="mt-4 w-full bg-gray-300 h-2 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  userData.badge === "gold" ? "bg-yellow-400" : "bg-orange-400"
                }`}
                style={{ width: userData.badge === "gold" ? "100%" : "60%" }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-8">
        <h3 className="text-2xl text-primary font-semibold mb-4">
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
                <h4 className="font-semibold text-primary text-lg">
                  {post.title}
                </h4>
                <p className="text-sm line-clamp-2">{post.description}</p>
                <div className="mt-2 text-xs text-secondary flex justify-between">
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
