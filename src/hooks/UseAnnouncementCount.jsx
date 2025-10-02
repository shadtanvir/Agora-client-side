import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useAnnouncementCount() {
  return useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axios.get("https://agora-shadtanvir-server.vercel.app/announcements/count");
      // backend should return { count: number }
      return res.data.count;
    },
    initialData: 0, // fallback so it's never undefined
  });
}

export default useAnnouncementCount;
