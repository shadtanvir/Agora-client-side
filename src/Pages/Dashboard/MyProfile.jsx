import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import bronze_badge from "../../assets/bronze_badge.png";
import gold_badge from "../../assets/gold_badge.png";
import Loading from "../../components/Loading";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setProfile(res.data));
    }
  }, [user]);

  if (!profile) {
    return <Loading></Loading>;
  }

  const { user: userData, recentPosts } = profile;

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
              <span className="inline-flex items-center  py-1">
                <img src={gold_badge} alt="gold" className="w-12 h-17" />
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
                className="p-4 bg-base-100 border rounded-lg shadow-sm"
              >
                <h4 className="font-semibold text-lg">{post.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>Tag: {post.tag}</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US")}
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
