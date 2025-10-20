import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { useEffect } from "react";
const Footer = () => {
  return (
    <footer className="bg-base-300 text-primary font-inter mt-15 py-10">
      <div className="w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 ">
        {/* Column 1: Logo & Slogan */}
        <div className="pl-2">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
              <span className="text-blue-600 text-3xl font-bold">Agora</span>
            </Link>
          </div>

          <p className=" pl-6 max-w-xs text-secondary ">
            Agora — a place for open, constructive discussion. Post, vote, and
            discover ideas across tags and topics. Built for community-driven
            conversation.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="pl-8 md:pr-3 md:pl-0">
          <h3 className="text-xl font-poppins font-semibold mb-3 text-primary md:pt-6">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li>
              <Link to="/" className="hover:text-accent transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/membership" className="hover:text-accent transition">
                Membership
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-accent transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="md:pr-6 pl-8  md:pl-0">
          <h3 className="text-xl md:pt-6 font-poppins text-primary font-semibold mb-3 ">
            Contact Us
          </h3>
          <div className="flex space-x-3 mt-4">
            <a
              href="https://www.facebook.com/tahmedshad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-primary transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/tanvir70469110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-primary transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/tanvirshad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl  hover:text-primary transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/shadtanvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-primary transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-10 text-center text-sm text-secondary pt-4"
        style={{
          borderTop: "1px solid var(--color-base-200)", // uses your bronze color for subtle divider
        }}
      >
        © {new Date().getFullYear()}{" "}
        <Link to="/">
          <span className="font-bold text-accent">Agora</span>
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
