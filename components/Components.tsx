import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Theme Context
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
// Footer Component
export const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-center mb-4">
            &copy; {new Date().getFullYear()} Sungblab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/kimsungbin1119/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl hover:text-[#57c5b5] transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Kimsungbin1"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl hover:text-[#57c5b5] transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Header Component
export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header
      className={`py-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold">
            Sungblab
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className={`hover:text-[#57c5b5] font-bold text-lg transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`hover:text-[#57c5b5] font-bold text-lg transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`hover:text-[#57c5b5] font-bold text-lg transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Blog
            </Link>
            <button onClick={toggleTheme} className="ml-4">
              {theme === "dark" ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="mr-4">
              {theme === "dark" ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="mt-4 md:hidden overflow-hidden"
            >
              <Link
                href="/"
                className={`block py-2 hover:text-[#57c5b5] transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`block py-2 hover:text-[#57c5b5] transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className={`block py-2 hover:text-[#57c5b5] transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Blog
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

// Layout Component
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col min-h-screen font-sans ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// ProjectCard Component
interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies = [],
}) => {
  const { theme } = useTheme();
  return (
    <div
      className={`shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-6">
        <h3
          className={`text-xl font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
        {technologies.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <a
          href="/projects"
          className="inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

// SocialButton Component
interface SocialButtonProps {
  href: string;
  icon: "github" | "youtube" | "linkedin" | "twitter" | "instagram";
  label: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  label,
}) => {
  const { theme } = useTheme();
  const IconComponent = {
    github: FaGithub,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram,
  }[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-4 py-2 rounded-full transition-colors ${
        theme === "dark"
          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      <IconComponent className="mr-2" />
      {label}
    </a>
  );
};

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  postSlug: string;
}

export const Comments: React.FC<CommentsProps> = ({ postSlug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    const response = await axios.get(`/api/comments?postSlug=${postSlug}`);
    setComments(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/comments", { postSlug, name, content });
    setName("");
    setContent("");
    fetchComments();
  };

  return (
    <div className="mt-8">
      <h3
        className={`text-2xl font-semibold mb-4 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Comments
      </h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={`w-full p-2 mb-2 border rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your comment"
          className={`w-full p-2 mb-2 border rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Comment
        </button>
      </form>
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className={`mb-4 p-4 rounded ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p
              className={`font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {comment.name}
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {comment.content}
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BlogPostProps {
  content: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  const { theme } = useTheme();
  const optimizedContent = React.useMemo(() => {
    return content.replace(
      /<img\s+src="([^"]+)"\s+alt="([^"]+)">/g,
      (match, src, alt) => `
        <div class="relative w-full h-64 my-4">
          <Image
            src="${src}"
            alt="${alt}"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      `
    );
  }, [content]);

  return (
    <div
      className={`blog-content ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
      dangerouslySetInnerHTML={{ __html: optimizedContent }}
    />
  );
};

export default Comments;
