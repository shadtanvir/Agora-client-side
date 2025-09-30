import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bell } from "lucide-react";
import Loading from "./Loading";
import { GrAnnounce } from "react-icons/gr";

const fetchAnnouncements = async () => {
  const { data } = await axios.get("http://localhost:5000/announcements");
  return data;
};

export default function AnnouncementsSection() {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) <Loading></Loading>;

  // If no announcements, section is hidden
  if (announcements.length === 0) return;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-base-100 shadow-md rounded-2xl">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-4xl flex justify-center items-center gap-1 font-bold text-[var(--color-primary)]">
          <GrAnnounce className="text-4xl text-orange-500" />
          Announcements
        </h2>
      </div>

      <div className="space-y-4">
        {announcements.map((a, index) => (
          <div
            key={index}
            className="p-4 border border-primary rounded-lg bg-base-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={a.authorImage}
                alt={a.authorName}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold text-[var(--color-primary)]">
                {a.authorName}
              </span>
            </div>
            <h3 className="text-lg font-bold text-primary">
              {a.title}
            </h3>
            <p className="text-[var(--color-secondary)] mt-1">
              {a.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
