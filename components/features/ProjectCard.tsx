import React from "react";
import { useTheme } from "./ThemeContext";

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
            {technologies.map((tech: string, index: number): JSX.Element => (
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
