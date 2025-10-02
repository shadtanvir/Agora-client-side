import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer
      className="bg-base-100 text-primary font-inter px-6 md:px-10 py-10"
      /* bg-base-100 uses your --color-base-100 variable (theme aware) */
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-40">
        {/* Column 1: Logo & Slogan */}
        <div>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Agora logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-accent text-2xl md:text-3xl font-bold ml-3">
                Agora
              </span>
            </Link>
          </div>
          <p className="mt-3 text-sm text-secondary max-w-sm">
            Agora — a place for open, constructive discussion. Post, vote, and
            discover ideas across tags and topics. Built for community-driven
            conversation.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-poppins font-semibold mb-3 text-primary">
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
              <Link to="/dashboard" className="hover:text-accent transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-poppins text-primary font-semibold mb-3 ">
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
