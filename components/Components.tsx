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
import BlogImage from "./blog/BlogImage";
import styled from "styled-components";

// Theme Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      return savedTheme || "light";
    }
    return "light";
  });

  const colors = {
    light: {
      background: "#FFFFFF",
      primary: "#4A5568",
      secondary: "#718096",
      border: "#E2E8F0",
    },
    dark: {
      background: "#1A202C",
      primary: "#A0AEC0",
      secondary: "#718096",
      border: "#2D3748",
    },
  };

  const contextValue = {
    theme,
    toggleTheme: () =>
      setTheme((prev) => (prev === "light" ? "dark" : "light")),
    colors: colors[theme],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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
      className={`py-8 relative ${
        theme === "dark"
          ? "bg-gray-900/95 text-white border-t border-gray-800/50"
          : "bg-white/95 text-gray-600 border-t border-gray-200/50"
      } backdrop-blur-sm`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-blue-500/5 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <div
              className={`h-px ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              &copy; {new Date().getFullYear()} Sungblab. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a
                href="mailto:sungblab@gmail.com"
                whileHover={{ scale: 1.05 }}
                className={`group relative font-medium transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05 }}
                className={`group relative font-medium transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            </div>
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
      className={`sticky top-0 z-50 py-4 backdrop-blur-md ${
        theme === "dark"
          ? "bg-gray-900/80 text-white border-b border-gray-800/50"
          : "bg-white/80 text-gray-900 border-b border-gray-200/50"
      } transition-colors duration-300`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="min-w-[140px] text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-size-200 animate-gradient py-2"
          >
            Sungblab
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Projects", "Blog"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`relative group font-bold text-lg transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl backdrop-blur-sm border border-transparent transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30"
                  : "bg-white/80 hover:bg-white hover:border-purple-500/30"
              }`}
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FaMoon className="text-gray-600 w-5 h-5" />
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`mr-4 p-2 rounded-xl backdrop-blur-sm border border-transparent transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30"
                  : "bg-white/80 hover:bg-white hover:border-purple-500/30"
              }`}
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FaMoon className="text-gray-600 w-5 h-5" />
              )}
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
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
              </motion.div>
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
              {["Home", "Projects", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`block py-3 px-4 rounded-xl backdrop-blur-sm border border-transparent transition-all duration-300 mb-2 ${
                    theme === "dark"
                      ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30 text-gray-300"
                      : "bg-white/80 hover:bg-white hover:border-purple-500/30 text-gray-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
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
      className={`flex flex-col min-h-screen font-sans antialiased ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <Header />
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
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
  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  label,
  className,
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
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800/80 text-gray-200 hover:bg-purple-900/80"
          : "bg-gray-200/80 text-gray-800 hover:bg-purple-100/80"
      } backdrop-blur-sm ${className || ""}`}
    >
      <IconComponent className="text-lg" />
      <span className="font-medium">{label}</span>
      <motion.span
        className="ml-1 opacity-0 -translate-x-2"
        variants={{
          hover: { opacity: 1, x: 0 },
          initial: { opacity: 0, x: -8 },
        }}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
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

export const mdxComponents = {
  img: (props: any) => (
    <BlogImage src={props.src} alt={props.alt} className="rounded-lg my-4" />
  ),
  // 다른 MDX 컴포넌트들...
};

export default Comments;

// theme 타입 의
interface ThemeType {
  colors: {
    background: string;
    primary: string;
    secondary: string;
    border: string;
  };
}

export const Button = styled.button<{ theme: ThemeType }>`
  background: ${({ theme }) => theme?.colors?.primary || "#4A5568"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Card = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }) => theme?.colors?.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme?.colors?.border || "#E2E8F0"};
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Tag = styled.span<{ theme: ThemeType }>`
  background: ${({ theme }) => theme?.colors?.secondary || "#718096"};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;
