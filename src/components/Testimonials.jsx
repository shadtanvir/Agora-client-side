import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Agora helped me grow from a learner to a mentor. The supportive community and high-quality posts keep me inspired every day.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Frontend Engineer",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    text: "The discussions here are gold. I learned more practical React and Node.js skills in a few weeks than from months of tutorials.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rafiul Islam",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    text: "Being part of Agora not only improved my technical skills but also helped me connect with professionals in the Bangladeshi IT scene.",
    rating: 4,
  },
  {
    id: 4,
    name: "Maria Rahman",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    text: "The interface is so intuitive and clean! I love how design and technology meet in this amazing platform.",
    rating: 5,
  },
  {
    id: 5,
    name: "Hasibul Hasan",
    role: "Backend Developer ",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    text: "Agora discussions helped me refine my Express.js and MongoDB skills. It’s like Stack Overflow but with more community warmth.",
    rating: 5,
  },
  {
    id: 6,
    name: "Aisha Noor",
    role: "AI Research Enthusiast",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    text: "I found mentors who guided me into Machine Learning. Agora’s forums are the best place to get real advice from real engineers.",
    rating: 5,
  },
  {
    id: 7,
    name: "Imran Hossain",
    role: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    text: "I learned about Docker, CI/CD pipelines, and cloud best practices right from community-shared projects. Absolutely top-notch!",
    rating: 4,
  },
  {
    id: 8,
    name: "Sadia Akter",
    role: "Frontend Developer Intern",
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    text: "As a student, Agora gave me exposure to real-world projects. I got internship guidance and portfolio reviews from senior developers.",
    rating: 5,
  },
  {
    id: 9,
    name: "John Mathew",
    role: "Software Architect",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "I’ve been part of many dev communities, but Agora stands out for its modern design, helpful members, and meaningful discussions.",
    rating: 5,
  },
  {
    id: 10,
    name: "Farhana Taz",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    text: "The analytics discussions on Agora helped me understand data pipelines better. It's an incredible knowledge-sharing platform!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className=" pt-10 font-poppins">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 "
      >
        <h2 className="text-2xl  font-semibold text-primary mb-8">
          Voices of the Community
        </h2>
        

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative  shadow-xl hover:shadow-2xl rounded-2xl p-5"
            >
              {/* Quote icons */}
              <FaQuoteLeft className="text-indigo-200 text-4xl absolute top-2 left-2" />
              <FaQuoteRight className="text-indigo-200 text-4xl absolute bottom-2 right-2" />

              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{t.role}</p>

                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array(t.rating)
                    .fill()
                    .map((_, index) => (
                      <FaStar key={index} />
                    ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed">
                  “{t.text}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    
    </section>
  );
};

export default Testimonials;
