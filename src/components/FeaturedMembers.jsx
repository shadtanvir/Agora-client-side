import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Medal, Star, Award } from "lucide-react";
import Loading from "./Loading";
import axios from "axios";
import bronze_badge from "../assets/bronze_badge.png";
import gold_badge from "../assets/gold_badge.png";

const FeaturedMembers = () => {
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["featuredMembers"],
    queryFn: async () => {
      const res = await axios.get("https://agora-shadtanvir-server.vercel.app/featured-members");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <section className=" pt-10 b">
      <div className="relative max-w-6xl mx-auto px-6 ">
        <motion.h2
          className="text-2xl  font-semibold mb-8 text-primary"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Featured Community Members
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {members.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className=" shadow-lg rounded-3xl p-6 hover:shadow-2xl text-center "
            >
              <img
                src={member.photoURL}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary shadow-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{member.email}</p>

              {/* Badge */}
              <div className="text-center">
                {member.badge === "bronze" && (
                  <span className="inline-flex items-center py-1 rounded-full text-sm font-medium">
                    <img
                      src={bronze_badge}
                      alt="Bronze"
                      className="w-15 h-15"
                    />
                  </span>
                )}
                {member.badge === "gold" && (
                  <span className="inline-flex items-center py-1">
                    <img src={gold_badge} alt="Gold" className="w-12 h-17" />
                  </span>
                )}
              </div>

             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMembers;
