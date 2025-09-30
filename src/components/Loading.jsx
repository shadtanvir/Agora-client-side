import Lottie from "lottie-react";
import loading from "../assets/Trail loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[250px]">
        <Lottie animationData={loading}></Lottie>
      </div>
    </div>
  );
};

export default Loading;
