import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaMedal, FaChartLine, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <section
      className="w-5xl py-15 px-6 mx-auto font-poppins"
      style={{
        backgroundColor: "var(--color-base-100)",
        color: "var(--color-primary)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="text-center mb-16"
      >
        <h1 className="text-2xl md:text-4xl text-primary font-semibold  mb-4">About Agora</h1>
        <p className="text-lg text-[var(--color-secondary)] text-center max-w-3xl mx-auto ">
          A modern digital forum empowering discussions, collaboration, and
          learning — inspired by the ancient marketplace of ideas.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="mb-15"
      >
        <h2 className="text-2xl mb-8 font-semibold text-primary">
          Our Mission
        </h2>
        <p className="text-[var(--color-secondary)] leading-relaxed ">
          At <span className="text-primary">Agora</span>, we strive to create an
          inclusive community where every learner, developer, and creator can
          share knowledge, express ideas, and grow together. Our mission is to
          make meaningful discussion and collaboration accessible to everyone.
        </p>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="mb-15"
      >
        <h2 className="text-2xl mb-8 font-semibold text-primary">
          Our Vision
        </h2>
        <p className="text-[var(--color-secondary)] leading-relaxed ">
          We envision <span className="text-primary">Agora</span> as more than a forum — a vibrant
          learning hub and collaborative network where curiosity meets
          knowledge. We blend community-driven interaction with modern web
          technology to redefine how people connect and grow.
        </p>
      </motion.div>

      {/* Built With */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="mb-15"
        
      >
        <h2 className="text-2xl font-semibold mb-8 text-primary">
          Built With Passion
        </h2>
        <p className="text-[var(--color-secondary)]  ">
          Developed using the{" "}
          <span className="text-primary">MERN Stack (MongoDB, Express.js, React, Node.js)</span> with
          secure authentication, real-time features, and a clean, user-friendly
          design — all crafted to bring an exceptional community experience.
        </p>
      </motion.div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-8 text-primary">
          Our Features
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          {
            icon: (
              <FaUsers className="text-4xl mb-4 text-[var(--color-accent)]" />
            ),
            title: "Community Discussions",
            desc: "Share insights and questions across topics with a supportive community.",
          },
          {
            icon: (
              <FaMedal className="text-4xl mb-4 text-[var(--color-success)]" />
            ),
            title: "Reward System",
            desc: "Earn Bronze and Gold badges by becoming member of our forum.",
          },
          {
            icon: (
              <FaChartLine className="text-4xl mb-4 text-[var(--color-accent)]" />
            ),
            title: "Interactive Dashboard",
            desc: "Track your posts, monitor votes, and see your growth over time.",
          },
          {
            icon: (
              <FaHandshake className="text-4xl mb-4 text-[var(--color-success)]" />
            ),
            title: "Fair & Open Space",
            desc: "Experience respectful, moderated discussions led by transparency.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
            className=" shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              {item.icon}
              <h3 className="text-xl text-primary font-semibold mb-2">{item.title}</h3>
              <p className="text-[var(--color-secondary)] text-sm">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
