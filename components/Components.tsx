import React, { useState } from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// Footer Component
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <p className="text-center text-lg mb-4">
            &copy; {new Date().getFullYear()} Sungblab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/kimsungbin1119/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#57c5b5] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Kimsungbin1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#57c5b5] transition-colors duration-300"
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
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-[#57c5b5]">
            Sungblab
          </Link>
          <div className="hidden md:flex space-x-6 text-lg">
            <Link
              href="/"
              className="hover:text-[#57c5b5] text-2xl transition-colors duration-300 font-bold"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="hover:text-[#57c5b5] text-2xl transition-colors duration-300 font-bold"
            >
              Projects
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
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
              className="block py-2 hover:text-[#57c5b5] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block py-2 hover:text-[#57c5b5] transition-colors duration-300"
            >
              Projects
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
  link: string;
  technologies?: string[]; // Make technologies optional
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
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
          href={link}
          target="_blank"
          rel="noopener noreferrer"
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
