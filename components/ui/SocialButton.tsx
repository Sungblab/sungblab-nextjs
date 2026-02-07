import { motion } from "framer-motion";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useTheme } from "../features/ThemeContext";

interface SocialButtonProps {
  href: string;
  icon: "github" | "youtube" | "linkedin" | "twitter" | "instagram" | "email" | "threads";
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
    threads: FaThreads,
    email: FaEnvelope,
  }[icon];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800/80 text-gray-200 hover:bg-gray-700/80 border-gray-700/50 hover:border-purple-700/50"
          : "bg-gray-100/80 text-gray-800 hover:bg-gray-200/80 border-gray-200/50 hover:border-purple-300/50"
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
