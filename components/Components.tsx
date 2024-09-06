import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";
import Image from "next/image";

// Footer Component
export const Footer: React.FC = () => {
  return (
    <footer className=" py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-600 mb-4">
            &copy; {new Date().getFullYear()} Sungblab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/kimsungbin1119/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-[#57c5b5] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Kimsungbin1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-[#57c5b5] transition-colors duration-300"
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

  return (
    <header className="py-4">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-gray-800">
            Sungblab
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#57c5b5] text-lg transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-[#57c5b5] text-lg transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-[#57c5b5] text-lg transition-colors duration-300"
            >
              Blog
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
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
        {isOpen && (
          <div className="mt-4 md:hidden">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-[#57c5b5] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block py-2 text-gray-600 hover:text-[#57c5b5] transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-gray-600 hover:text-[#57c5b5] transition-colors duration-300"
            >
              Blog
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

// Layout Component
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
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
  technologies = [], // Provide a default empty array
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {technologies.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
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
  icon: "github" | "youtube" | "linkedin" | "twitter" | "instagram"; // Add instagram here
  label: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  label,
}) => {
  const IconComponent = {
    github: FaGithub,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram, // Add instagram mapping here
  }[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
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
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your comment"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Comment
        </button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold">{comment.name}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;

interface BlogPostProps {
  content: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
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
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: optimizedContent }}
    />
  );
};
